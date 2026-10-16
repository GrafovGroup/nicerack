import {submitLead} from '@/lib/lead-delivery';
import {NextRequest,NextResponse} from 'next/server';
import {quoteSchema} from '@/lib/quote';
export async function POST(req:NextRequest){
 const origin=req.headers.get('origin');
 if(origin){
  let originUrl:URL;
  try{originUrl=new URL(origin)}catch{return NextResponse.json({message:'Request origin is not allowed.'},{status:403})}
  // Next may normalize nextUrl to localhost; the actual request Host preserves the browser origin.
  const requestHost=req.headers.get('host')||req.nextUrl.host;
  if(originUrl.host!==requestHost||!['http:','https:'].includes(originUrl.protocol))return NextResponse.json({message:'Request origin is not allowed.'},{status:403});
 }
 if(!req.headers.get('content-type')?.includes('application/json'))return NextResponse.json({message:'Expected a JSON request.'},{status:415});
 const raw=await req.text();
 if(new TextEncoder().encode(raw).length>20000)return NextResponse.json({message:'Request is too large.'},{status:413});
 let body:unknown;try{body=JSON.parse(raw)}catch{return NextResponse.json({message:'Invalid request.'},{status:400})}
 const parsed=quoteSchema.safeParse(body);
 if(!parsed.success)return NextResponse.json({message:'Review your details and try again.',fields:parsed.error.flatten().fieldErrors},{status:422});
 try{
  const id=await submitLead(parsed.data,req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown');
  return NextResponse.json({message:'Your request has been submitted. We will contact you about your project.',reference:id},{headers:{'Cache-Control':'no-store'}});
 }catch(error){
  if(error instanceof Error&&error.message==='rate')return NextResponse.json({message:'Please wait before sending another request, or call (833) 696-9996.'},{status:429});
  return NextResponse.json({message:'Your request was not sent. Please call (833) 696-9996 or email info@nicerack.ca. Your details remain in this form.'},{status:503,headers:{'Cache-Control':'no-store'}});
 }
}
