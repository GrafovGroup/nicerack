const http = require('node:http');
const next = require('next');
process.env.NODE_ENV = 'production';
const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();
app.prepare().then(() => {
  http.createServer((req, res) => handle(req, res)).listen(process.env.PORT || 3000);
}).catch(() => { console.error('NiceRack could not start.'); process.exit(1); });
