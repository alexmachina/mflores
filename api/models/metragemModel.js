let mongoose = require('mongoose')

let schema = mongoose.Schema({
  areaTotal: {type:String, default:0},
  areaConstruida: {type:String, default:0},
  capacidade: {type:String, default:0}
})

module.exports = schema
