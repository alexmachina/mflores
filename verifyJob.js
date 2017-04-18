let imovelModel = require('./api/models/imovelModel')
let mongoose = require('mongoose')
let config = require('./config')
let nodemailer = require('nodemailer')
let moment = require('moment')

module.exports = function verifyAndSendEmail() {
let cutoff = new Date()
today = new Date()
cutoff.setDate(cutoff.getDate() + 30)

imovelModel.find({'locatario.dataFimValidadeGarantia': {$lt:cutoff, $gt:today}}).exec().then(imoveis => {
  if (imoveis.length) {
    try{

      let transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 587,
        auth:{
          user:'notificacao@webyang.com.br',
          pass: 'cthulhu1'
        }
      })
      console.log('transport created')
      let mailOptions = {
        from: 'notificacao@webyang.com.br',
        to: 'alex.xmde@gmail.com',
        subject: 'Aviso: Vencimento de garantia',
        html: createHtml(imoveis)
      }
      transporter.sendMail(mailOptions, err => {
        if(err)
          return console.log(err)

        console.log('Email sent')
      })
    } catch(ex) {
      console.log(ex)
    }
  }
})

function createHtml(imoveis) {
  let tbody = ''
  imoveis.forEach(i => {
    tbody += `<tr>
    <td>${i.titulo}</td>
    <td>${moment(i.locatario.dataFimValidadeGarantia).format('DD/MM/YYYY')}</td>
    </tr>`
  })
  let html = `<div>
  <span>Aviso: Próximos vencimentos de Garantias
  <table>
    <thead>
    <tr>
      <th>Imovel</th>
      <th>Vencimento da garantia</th>
    </tr>
    </thead>
    <tbody>
      ${tbody}
    </tbody>
  </table>
  </div>`
    return html
}
}
