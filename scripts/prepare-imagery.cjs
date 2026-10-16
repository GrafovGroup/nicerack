/* eslint-disable @typescript-eslint/no-require-imports -- Node-only asset preparation script. */
// Encode generated originals for the website and retain exact provenance.
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const sharp=require(require.resolve('sharp',{paths:[require.resolve('next')]}));
async function main(){
 const plan=JSON.parse(fs.readFileSync('docs/imagery/image-plan.json'));
 const generated=JSON.parse(fs.readFileSync('docs/imagery/generation-results.json'));
 const revisions=fs.existsSync('docs/imagery/replacements.json')?JSON.parse(fs.readFileSync('docs/imagery/replacements.json')):[];
 for(const revision of revisions){const entry=generated.find(r=>r.key===revision.key);if(entry)entry.path=revision.path;const item=plan.find(p=>p.key===revision.key);if(item)item.prompt=revision.prompt;}
 const register=[];
 for(const item of plan){
  const result=generated.find(r=>r.key===item.key&&r.path);
  if(!result)throw new Error('Missing original: '+item.key);
  fs.mkdirSync(path.dirname(item.output),{recursive:true});
  await sharp(result.path).resize({width:1200,height:900,fit:'inside',withoutEnlargement:true}).webp({quality:83}).toFile(item.output);
  const meta=await sharp(item.output).metadata();
  register.push({...item,website:'NiceRack.ca',src:'/'+item.output.replace(/^public\//,''),width:meta.width,height:meta.height,source:'Built-in image generation; original '+path.basename(result.path),original:result.path,sha256:crypto.createHash('sha256').update(fs.readFileSync(item.output)).digest('hex')});
 }
 fs.writeFileSync('docs/imagery/asset-register.json',JSON.stringify(register,null,2)+'\n');
 const en=JSON.parse(fs.readFileSync('src/content/en/products.json'));
 for(const p of en){const a=register.find(a=>a.locale==='en'&&a.id===p.id);p.images=[{src:a.src,alt:a.alt,source:a.source}];}
 fs.writeFileSync('src/content/en/products.json',JSON.stringify(en,null,2)+'\n');
 const publicMap=Object.fromEntries(register.filter(a=>a.locale==='fr'||a.key.startsWith('service-')).map(a=>[a.route,{src:a.src,alt:a.alt,width:a.width,height:a.height}]));
 fs.writeFileSync('src/content/placement-images.json',JSON.stringify(publicMap,null,2)+'\n');
 console.log('Prepared '+register.length+' unique placement images');
}
main().catch(e=>{console.error(e);process.exitCode=1});
