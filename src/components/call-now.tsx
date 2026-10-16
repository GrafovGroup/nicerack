import {Phone} from 'lucide-react';
import {site} from '@/lib/site';
export function CallNow({className='call-now',showNumber=true}:{className?:string;showNumber?:boolean}){return <a className={className} href={`tel:${site.tel}`} aria-label={`CALL NOW: NiceRack at ${site.phone}`}><Phone size={17} aria-hidden="true"/><span>CALL NOW{showNumber&&<> <span className="call-number">{site.phone}</span></>}</span></a>}
