import {NextRequest,NextResponse} from 'next/server';
import {quoteSchema} from './quote';
import {submitLead,type Enquiry} from './lead-delivery';
export const acceptedMessage='Your enquiry has been accepted for delivery. We will contact you about your project.';
export function createEnquiryHandler(deliver:(data:Enquiry,ip:string)=>Promise<string>=submitLead){
 return async(req:NextRequest)=>{
  const respond=(body:unknown,status=200)=>NextResponse.json(body,{status,headers:{'Cache-Control':'no-store'}});
  const origin=req.headers.get('origin');
  if(origin){
   try{const url=new URL(origin);if(url.host!==(req.headers.get('host')||req.nextUrl.host)||!['http:','https:'].includes(url.protocol))return respond({message:'Request origin is not allowed.'},403);}catch{return respond({message:'Request origin is not allowed.'},403);}
  }
  if(req.headers.get('sec-fetch-site')==='cross-site')return respond({message:'Request origin is not allowed.'},403);
  if(req.headers.get('content-type')?.split(';')[0].trim()!=='application/json')return respond({message:'Expected a JSON request.'},415);
  let raw='';const reader=req.body?.getReader();let bytes=0;const decoder=new TextDecoder();
  try{if(reader){while(true){const {done,value}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>20000){await reader.cancel();return respond({message:'Request is too large.'},413);}raw+=decoder.decode(value,{stream:true});}raw+=decoder.decode();}}catch{return respond({message:'Your request could not be read. Please try again.'},400);}
  let body:unknown;try{body=JSON.parse(raw);}catch{return respond({message:'Invalid request.'},400);}
  const parsed=quoteSchema.safeParse(body);if(!parsed.success)return respond({message:'Review your details and try again.',fields:parsed.error.flatten().fieldErrors},422);
  try{
   // Trust a forwarded address only after the hosting proxy is verified to overwrite this header.
   const header=process.env.TRUSTED_CLIENT_IP_HEADER;
   const ip=header?req.headers.get(header)?.split(',')[0]?.trim().slice(0,64)||'unknown':'unknown';
   const reference=await deliver(parsed.data,ip);return respond({message:acceptedMessage,reference});
  }catch(error){
   if(error instanceof Error&&error.message==='rate')return respond({message:'Please wait before sending another enquiry, or email info@nicerack.ca.'},429);
   return respond({message:'Your enquiry could not be confirmed as sent. Please try again or email info@nicerack.ca. Your details remain in this form.'},503);
  }
 };
}
