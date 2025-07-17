const fs = require('fs');
const https = require('https');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('./cert/localhost-key.pem'),
  cert: fs.readFileSync('./cert/localhost.pem'),
};

app.prepare().then(() => {
  https
    .createServer(httpsOptions, (req, res) => {
      handle(req, res);
    })
    .listen(3000, () => {
      console.log('HTTPS 개발 서버 시작됨: https://localhost:3000');
    });
});
