let mongoose = require('mongoose')

let schema = mongoose.Schema({
  areaTotal: {type:Number, default:0},
  areaConstruida: {type:Number, default:0},
  capacidade: {type:Number, default:0}
})

module.exports = schema
