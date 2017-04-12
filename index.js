const express = require('express'),
      bodyParser = require('body-parser'),
  router = require('./api/routes'),
  mongoose = require('mongoose')

let app = express();
app.set('port', (process.env.PORT || 3000))
app.set('mongodbURI', (process.env.MONGODB_URI || 'mongodb://mflores:*Cthulhu1@mflores.mongodb.uhserver.com/mflores'))
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
app.use(corsMiddleware);

mongoose.connect(app.get('mongodbURI'))

app.use(router)

app.listen(app.get('port'), err => err ? 
  console.log(err) : 
  console.log("Running: " + app.get('port'))
);


