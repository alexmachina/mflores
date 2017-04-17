let config = require('./config.js')
const express = require('express'),
      bodyParser = require('body-parser'),
  router = require('./api/routes'),
  mongoose = require('mongoose')

let verifyAndSendEmail = require('./verifyJob')

let app = express();
app.set('port', (process.env.PORT || 3000))
let conString = config.mongoDbConString
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
corsMiddleware = function (req, res, next) {
  console.log('appending CORS')
  res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, HEAD, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === 'OPTIONS') {
    return res.end();
  }
  next();
}

app.use('/', corsMiddleware, express.static('app'));

mongoose.connect(conString)

app.use(corsMiddleware);
app.use(router)

app.listen(app.get('port'), err => err ? 
  console.log(err) : 
  console.log("Running: " + app.get('port'))
);


var CronJob = require('cron').CronJob;
new CronJob('00 55 10 * * *', function() {
  verifyAndSendEmail()
}, null, true, 'America/Sao_Paulo');

console.log('CRON Job set')
