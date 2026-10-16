import Image from 'next/image';
import images from '@/content/placement-images.json';

/** Only detail pages and named service sections own these images. */
export function PlacementImage({placement}:{placement:string}){
 const image=images[placement as keyof typeof images];
 if(!image)return null;
 return <figure className="placement-image"><Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width:760px) 91vw, 800px"/></figure>;
}
