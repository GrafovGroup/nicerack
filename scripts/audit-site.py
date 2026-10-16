"""Read-only route, metadata, schema, CTA and internal-link audit of a production build.
Usage: python3 scripts/audit-site.py http://127.0.0.1:3000
No forms are submitted. Query routes and fragment targets are checked too.
"""
import sys,json,re,gzip,time,urllib.request,urllib.error,urllib.parse,xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
base=(sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:3000').rstrip('/')
class Page(HTMLParser):
 def __init__(self):super().__init__();self.attrs=[];self.title='';self.in_title=False;self.h1=0;self.ids=set();self.links=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs);self.attrs.append((tag,a));self.h1+=tag=='h1'
  if tag=='title':self.in_title=True
  if a.get('id'):self.ids.add(a['id'])
  if tag=='a' and a.get('href','').startswith(('/','#')):self.links.append(a['href'])
 def handle_endtag(self,tag):
  if tag=='title':self.in_title=False
 def handle_data(self,s):
  if self.in_title:self.title+=s

def fetch(path):
 start=time.perf_counter()
 try:
  with urllib.request.urlopen(base+path,timeout=45) as r:body=r.read().decode();status=r.status
 except urllib.error.HTTPError as e:body=e.read().decode();status=e.code
 p=Page();p.feed(body)
 return dict(path=path,status=status,body=body,page=p,ms=round((time.perf_counter()-start)*1000),gzipBytes=len(gzip.compress(body.encode())))
xml=ET.fromstring(urllib.request.urlopen(base+'/sitemap.xml').read())
urls=[x.text for x in xml.iter() if x.tag.endswith('loc')]
paths=[urllib.parse.urlsplit(u).path or '/' for u in urls]
results=list(ThreadPoolExecutor(max_workers=6).map(fetch,paths));cache={r['path']:r for r in results};errors=[];titles=set();descriptions=set();links=set();schemas=set()
if len(paths)!=len(set(paths)):errors.append('Duplicate sitemap URL')
for url,r in zip(urls,results):
 p=r['page'];path=r['path'];attrs=p.attrs
 def require(ok,message):
  if not ok:errors.append(path+': '+message)
 require(r['status']==200,'status '+str(r['status']));require(p.h1==1,'H1 count '+str(p.h1))
 require(p.title and p.title not in titles,'missing/duplicate title');titles.add(p.title)
 desc=next((a.get('content','') for t,a in attrs if t=='meta' and a.get('name')=='description'),'')
 require(desc and desc not in descriptions,'missing/duplicate description');descriptions.add(desc)
 require(any(t=='link' and a.get('rel')=='canonical' and a.get('href')==url for t,a in attrs),'incorrect canonical')
 require(not any(t=='meta' and a.get('name')=='robots' and 'noindex' in a.get('content','') for t,a in attrs),'sitemap contains noindex')
 require('REQUEST A QUOTE' in r['body'] and 'CALL NOW' in r['body'],'missing CTA')
 phones=[a['href'] for t,a in attrs if t=='a' and a.get('href','').startswith('tel:')]
 require(phones and all(x=='tel:+18336969996' for x in phones),'phone mismatch')
 for raw in re.findall(r'<script type="application/ld\+json">(.*?)</script>',r['body']):
  data=json.loads(raw);schemas.add(data.get('@type',''))
  require(data.get('@type') in ['Organization','BreadcrumbList'],'unexpected structured data')
  require(not re.search(r'"(?:price|offers|ratingValue|aggregateRating)"',raw),'commercial schema')
 for link in p.links:
  resolved=urllib.parse.urlsplit(urllib.parse.urljoin('https://nicerack.ca'+path,link))
  links.add((resolved.path or '/',resolved.query,resolved.fragment))
  require(resolved.path not in ['/cart','/checkout'],'commerce link')
targets={p+('?' +q if q else '') for p,q,f in links}
for r in ThreadPoolExecutor(max_workers=6).map(fetch,sorted(targets-set(cache))):cache[r['path']]=r
for path,q,fragment in links:
 key=path+('?' +q if q else '');r=cache[key]
 if r['status']!=200:errors.append(key+': internal status '+str(r['status']))
 if fragment and urllib.parse.unquote(fragment) not in r['page'].ids:errors.append(key+'#'+fragment+': missing fragment')
for path in ['/products/not-a-real-rack','/locations/not-a-real-city','/guides/not-a-real-guide']:
 r=fetch(path)
 if r['status']!=404:errors.append(path+': expected 404')
summary={'sitemapPages':len(paths),'internalTargets':len(targets),'schemas':sorted(schemas),'errors':errors,'representativePayloads':[{'path':r['path'],'htmlGzipBytes':r['gzipBytes']} for r in results if r['path'] in ['/products','/locations','/guides','/locations/toronto','/guides/server-rack-sizing']]}
print(json.dumps(summary,indent=2));sys.exit(bool(errors))
