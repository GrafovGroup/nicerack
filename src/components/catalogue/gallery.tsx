import Image from 'next/image';
import type {CatalogueProduct} from '@/lib/product-schema';
export function ProductGallery({images,name}:{images:CatalogueProduct['images'];name:string}){
 if(!images.length)return null;
 return <section aria-label={`${name} gallery`} className="product-gallery">{images.map(image=><figure key={image.src}><a href={image.src} aria-label={`Open full image: ${image.alt}`}><Image src={image.src} alt={image.alt} width={1000} height={750} sizes="(max-width:760px) 88vw, 42vw"/></a></figure>)}</section>;
}
