let mongoose = require('mongoose')

let schema = new mongoose.Schema({
  username: String,
  fullName: String,
  email: String,
  active: Boolean,
  password: String
})

module.exports = mongoose.model('User',schema)
