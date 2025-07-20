const fs = require('fs');
const http = require('http');
const https = require('https');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const forceHttps = process.env.FORCE_HTTPS === 'true';
const app = next({ dev });
const handle = app.getRequestHandler();

const certPath = {
  key: './cert/localhost-key.pem',
  cert: './cert/localhost.pem',
};

app.prepare().then(() => {
  if (
    (dev || forceHttps) &&
    fs.existsSync(certPath.key) &&
    fs.existsSync(certPath.cert)
  ) {
    const options = {
      key: fs.readFileSync(certPath.key),
      cert: fs.readFileSync(certPath.cert),
    };
    https.createServer(options, handle).listen(3000, () => {
      console.log(`HTTPS Server: https://localhost:3000`);
    });
  } else {
    http.createServer(handle).listen(3000, () => {
      console.log(`HTTP Server:  http://localhost:3000`);
    });
  }
});
