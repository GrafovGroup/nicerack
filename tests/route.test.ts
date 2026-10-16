import test from 'node:test';
import assert from 'node:assert/strict';
import {NextRequest} from 'next/server';
import {POST} from '../src/app/api/quote/route';
const valid={name:'Example Customer',company:'',email:'customer@example.com',phone:'4165550100',province:'Ontario',city:'Toronto',category:'industrial',product:'',quantity:2,details:'We need storage for boxed materials.',installation:false,delivery:true,consent:true,website:'',source:{page:'/request-quote',category:'industrial',product:'',utm:{}}};
function request(body:unknown,origin='http://localhost:3000'){return new NextRequest('http://localhost:3000/api/quote',{method:'POST',headers:{'Content-Type':'application/json',origin},body:JSON.stringify(body)});}
test('valid request fails closed with no false delivery success',async()=>{const res=await POST(request(valid));assert.equal(res.status,503);assert.match((await res.json()).message,/could not be confirmed as sent/);});
test('invalid input fails before integration',async()=>assert.equal((await POST(request({...valid,consent:false}))).status,422));
test('rejects cross-origin requests',async()=>assert.equal((await POST(request(valid,'https://other.example'))).status,403));
test('rejects oversized payload',async()=>assert.equal((await POST(request({...valid,details:'x'.repeat(21000)}))).status,413));
test('rejects malformed JSON',async()=>assert.equal((await POST(new NextRequest('http://localhost:3000/api/quote',{method:'POST',headers:{'Content-Type':'application/json'},body:'{'}))).status,400));
test('accepts actual request Host when Next normalizes its URL hostname',async()=>{const req=new NextRequest('http://localhost:3000/api/quote',{method:'POST',headers:{'Content-Type':'application/json',origin:'http://127.0.0.1:3000',host:'127.0.0.1:3000'},body:JSON.stringify(valid)});assert.equal((await POST(req)).status,503);});
