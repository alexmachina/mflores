require('dotenv').config()
let server = require('./server')
let mongoose = require('mongoose')
let services = require('./services')

services() //Schedule services
server.listen(server.get('port'), err => {
  err ? 
  console.log(err) : 
  console.log("Running: " + server.get('port'))

  mongoose.connect(process.env.DB_URI)
});

