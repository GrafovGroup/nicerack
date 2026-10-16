'use client';
import {useEffect,useState} from 'react';
export function FilterForm({children,...props}:React.ComponentProps<'form'>){
 const [pending,setPending]=useState(false);
 useEffect(()=>{const reset=()=>setPending(false);window.addEventListener('pageshow',reset);return ()=>window.removeEventListener('pageshow',reset);},[]);
 return <form {...props} aria-busy={pending} onSubmit={()=>setPending(true)}>{children}<span className="filter-status" role="status" aria-live="polite">{pending?'Finding rack types…':''}</span></form>;
}
