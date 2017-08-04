let mongoose = require('mongoose')

let schema = new mongoose.Schema({
  username: String,
  fullname: String,
  email: String,
  active: Boolean,
  password: String,
  role: String
})

module.exports = mongoose.model('User',schema)
