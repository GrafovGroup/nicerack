"""Read-only audit: each registered image renders only on its assigned page."""
import sys,json,hashlib,urllib.request,urllib.parse,xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from pathlib import Path
base=sys.argv[1].rstrip('/') if len(sys.argv)>1 else 'http://127.0.0.1:3001'
register=json.loads(Path('docs/imagery/asset-register.json').read_text())
expected={a['src']:a for a in register}
class Images(HTMLParser):
 def __init__(self):super().__init__();self.images=[]
 def handle_starttag(self,tag,attrs):
  if tag!='img':return
  a=dict(attrs);src=a.get('src','');query=urllib.parse.parse_qs(urllib.parse.urlsplit(src).query)
  src=query.get('url',[src])[0]
  if src in expected:self.images.append((src,a))
def read(path):
 with urllib.request.urlopen(base+path,timeout=60) as r:return r.read()
xml=ET.fromstring(read('/sitemap.xml'));paths=[urllib.parse.urlsplit(x.text).path or '/' for x in xml.iter() if x.tag.endswith('loc')]
def page(path):
 p=Images();p.feed(read(path).decode());return path,p.images
errors=[];seen={src:[] for src in expected}
for route,images in ThreadPoolExecutor(max_workers=6).map(page,paths):
 for src,attrs in images:
  seen[src].append(route)
  if not attrs.get('alt'):errors.append(route+': missing alt')
  if not attrs.get('width') or not attrs.get('height'):errors.append(route+': missing dimensions')
for src,a in expected.items():
 if seen[src]!=[a['route'].split('#')[0]]:errors.append(src+': placement mismatch '+str(seen[src]))
def asset(a):
 raw=read(a['src']);return a['src'],hashlib.sha256(raw).hexdigest()==a['sha256']
for src,match in ThreadPoolExecutor(max_workers=4).map(asset,register):
 if not match:errors.append(src+': public checksum mismatch')
print(json.dumps({'pagesAudited':len(paths),'expectedImages':len(expected),'uniqueRenderedImages':sum(len(v)==1 for v in seen.values()),'assetChecksumsVerified':len(register),'errors':errors},indent=2))
if errors:sys.exit(1)
