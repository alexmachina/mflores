let devEnv = 'development'
const express = require('express'),
      bodyParser = require('body-parser'),
  router = require('./api/routes'),
  mongoose = require('mongoose')

let app = express();
app.set('port', (process.env.PORT || 3000))
switch(devEnv) {
  case 'development': 
    app.set('mongodbURI', 'mongodb://localhost/mflores')
    break
  case 'production':
    app.set('mongodbURI', ('mongodb://admin:*Cthulhu1@cluster0-shard-00-00-qzghe.mongodb.net:27017,cluster0-shard-00-01-qzghe.mongodb.net:27017,cluster0-shard-00-02-qzghe.mongodb.net:27017/mflores?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'))
    break
}
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


