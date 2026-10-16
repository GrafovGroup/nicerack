'use client';
import Link from 'next/link';
import Image from 'next/image';
import {useState} from 'react';
import {Menu,X,ArrowUpRight} from 'lucide-react';
const links=[['/categories','RACK CATEGORIES'],['/products','PRODUCTS'],['/services','SERVICES'],['/about','ABOUT']];
export function Header(){const [open,setOpen]=useState(false);return <header><div className="utility"><span>RACK & STORAGE SOLUTIONS FOR CANADIAN SPACES</span><a href="tel:+18336969996">(833) 696-9996</a></div><div className="nav-wrap"><Link href="/" className="logo" aria-label="NiceRack.ca home"><span className="brand-plate"><Image src="/brand/nicerack-nameplate.png" alt="NICERACK.CA" width={2172} height={724} priority/></span></Link><nav className="desktop-nav" aria-label="Main navigation">{links.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}</nav><Link href="/request-quote" className="button nav-quote">GET A QUOTE <ArrowUpRight size={17}/></Link><button className="menu-toggle" aria-expanded={open} aria-controls="mobile-nav" aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div>{open&&<nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{[...links,['/contact','CONTACT'],['/request-quote','GET A QUOTE']].map(([href,label])=><Link key={href} href={href} onClick={()=>setOpen(false)}>{label}</Link>)}</nav>}</header>}
