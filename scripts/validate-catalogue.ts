import {readFileSync} from 'node:fs';
import {validateCatalogueImport} from '../src/lib/catalogue-import';
const filename=process.argv[2] || 'src/content/en/products.json';
try{const rows=validateCatalogueImport(JSON.parse(readFileSync(filename,'utf8')));console.log(`Valid catalogue: ${rows.length} records. No files changed.`);}catch(error){console.error(error instanceof Error?error.message:'Invalid catalogue');process.exitCode=1;}
