let config = require('./config.js')
const express = require('express'),
  bodyParser = require('body-parser'),
  router = require('./api/routes'),
  mongoose = require('mongoose')

require('dotenv').config()

let verificaGarantia = require('./services/verificaGarantia.js')
let verificaContrato = require('./services/verificaContrato.js')
let verificaSeguro = require('./services/verificaSeguro.js')


let app = express();
app.set('port', (process.env.PORT || 3000))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
corsMiddleware = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, HEAD, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === 'OPTIONS') {
    return res.end();
  }
  next();
}

app.use('/', corsMiddleware, express.static('app'));

mongoose.connect(process.env.DB_URI)

app.use(corsMiddleware);
app.use(router)

app.listen(app.get('port'), err => err ? 
  console.log(err) : 
  console.log("Running: " + app.get('port'))
);


var CronJob = require('cron').CronJob;
new CronJob('50 10 * * *', function() {
  verificaGarantia()
  verificaContrato()
  verificaSeguro()
}, null, true, 'America/Sao_Paulo');

console.log('CRON Job set')
