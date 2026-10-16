'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {ProductCard} from '@/components/ui';
import type {Product} from '@/content/en/catalogue';
export function ComparePicker({products}:{products:Product[]}){
 const [selected,setSelected]=useState<string[]>([]),[message,setMessage]=useState('');
 const router=useRouter();
 function compare(){const params=new URLSearchParams({ids:selected.join(',')});const current=new URLSearchParams(window.location.search);for(const [key,value] of current){if(key.startsWith('utm_'))params.set(key,value.slice(0,200));}router.push('/compare?'+params);}
 function toggle(product:Product){
  setMessage('');
  if(selected.includes(product.id)){setSelected(selected.filter(id=>id!==product.id));return;}
  if(selected.length===3){setMessage('You can compare up to three rack types. Remove one to add another.');return;}
  if(selected.length&&products.find(p=>p.id===selected[0])?.categoryId!==product.categoryId){setMessage('Choose rack types in the same division. Clear your selection to change divisions.');return;}
  setSelected([...selected,product.id]);
 }
 return <><p className="small">Select up to three rack types in one division to compare their uses and planning requirements.</p><div className="product-grid">{products.map(p=><div className="selectable-product" key={p.id}><ProductCard product={p}/><label className="compare-check"><input type="checkbox" checked={selected.includes(p.id)} onChange={()=>toggle(p)}/> COMPARE <span className="sr-only">{p.name}</span></label></div>)}</div><div className="compare-bar"><p role="status" aria-live="polite">{message||`${selected.length} of 3 rack types selected`}</p><button className="button dark" disabled={selected.length<2} onClick={compare}>COMPARE SELECTED</button>{selected.length>0&&<button className="text-button" onClick={()=>{setSelected([]);setMessage('');}}>CLEAR SELECTION</button>}</div></>;
}
