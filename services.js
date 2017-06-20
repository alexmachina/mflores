let verificaGarantia = require('./services/verificaGarantia.js')
let verificaContrato = require('./services/verificaContrato.js')
let verificaSeguro = require('./services/verificaSeguro.js')

module.exports = function() {

let  CronJob = require('cron').CronJob;
new CronJob('30 11 * * *', function() {
  verificaGarantia()
  verificaContrato()
  verificaSeguro()
}, null, true, 'America/Sao_Paulo');

}

