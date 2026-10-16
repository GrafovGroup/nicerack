'use client';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
export function TrackedLink({href,children,className,...props}:Omit<React.ComponentProps<typeof Link>,'href'> & {href:string}){
 const router=useRouter();
 return <Link {...props} href={href} className={className} onClick={event=>{
  if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.button!==0)return;
  const current=new URLSearchParams(window.location.search),target=new URL(href,window.location.origin);
  for(const key of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']){const value=current.get(key);if(value)target.searchParams.set(key,value.slice(0,200));}
  if(target.search){event.preventDefault();router.push(target.pathname+target.search);}
 }}>{children}</Link>;
}
