const path = require('path');
const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const httpError = require('http-errors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const routes = require('../routes/index.route');
const config = require('./config');
const passport = require('./passport')

const app = express();

/*const privateKey = fs.readFileSync('/etc/letsencrypt/live/soscovidbrasil.com.br/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/soscovidbrasil.com.br/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/soscovidbrasil.com.br/chain.pem', 'utf8');


const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};
*/
if (config.env === 'development') {
  app.use(logger('dev'));
}

// Choose what fronten framework to serve the dist from
var distDir = '../../dist/';
if (config.frontend == 'react') {
  distDir = '../../node_modules/material-dashboard-react/dist'
} else {
  distDir = '../../dist/';
}

// 
app.use(express.static(path.join(__dirname, distDir)))
app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, distDir + '/index.html'));
});

console.log(distDir);
//React server
app.use(express.static(path.join(__dirname, '../../node_modules/material-dashboard-react/dist')))
app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(passport.initialize());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API router
app.use('/api/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new httpError(404)
  return next(err);
});

// Starting both http & https servers
/*const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8082, () => {
  console.log('HTTP Server running on port 80');
});

httpsServer.listen(8081, () => {
  console.log('HTTPS Server running on port 443');
});
*/
// error handler, send stacktrace only during development
app.use((err, req, res, next) => {

  // customize Joi validation errors
  if (err.isJoi) {
    err.message = err.details.map(e => e.message).join("; ");
    err.status = 400;
  }

  res.status(err.status || 500).json({
    message: err.message
  });
  next(err);
});

module.exports = app;
