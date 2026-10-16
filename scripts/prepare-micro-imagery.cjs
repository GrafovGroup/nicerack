/* eslint-disable @typescript-eslint/no-require-imports -- Node-only asset preparation script. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const sharp=require(require.resolve('sharp',{paths:[require.resolve('next')]}));
const read=p=>JSON.parse(fs.readFileSync(p));
const save=(p,x)=>fs.writeFileSync(p,JSON.stringify(x,null,2)+'\n');
async function main(){
 const plan=read('docs/micro-offerings/image-plan.json'),results=read('docs/micro-offerings/generation-results.json');
 const added=[];
 for(const p of plan){
  const r=results.find(x=>x.key===p.key);if(!r)throw Error('Missing '+p.key);
  fs.mkdirSync(path.dirname(p.output),{recursive:true});
  await sharp(r.path).resize({width:1200,height:900,fit:'inside',withoutEnlargement:true}).webp({quality:83}).toFile(p.output);
  const m=await sharp(p.output).metadata();
  added.push({...p,website:'NiceRack.ca',src:'/'+p.output.replace(/^public\//,''),width:m.width,height:m.height,source:'Built-in image generation; original '+path.basename(r.path),original:r.path,sha256:crypto.createHash('sha256').update(fs.readFileSync(p.output)).digest('hex')});
 }
 const keys=new Set(plan.map(x=>x.key));
 for(const [file,entries] of [['docs/imagery/asset-register.json',added],['docs/imagery/image-plan.json',plan],['docs/imagery/generation-results.json',results]])save(file,[...read(file).filter(x=>!keys.has(x.key)),...entries]);
 const products=read('src/content/en/products.json'),map=read('src/content/placement-images.json');
 for(const a of added){if(a.locale==='en'){const p=products.find(x=>x.id===a.id);p.images=[{src:a.src,alt:a.alt,source:a.source}];}else map[a.route]={src:a.src,alt:a.alt,width:a.width,height:a.height};}
 save('src/content/en/products.json',products);save('src/content/placement-images.json',map);
 console.log('Prepared '+added.length+' new exclusive images');
}
main().catch(e=>{console.error(e);process.exitCode=1});
