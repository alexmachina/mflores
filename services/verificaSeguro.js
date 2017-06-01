let imovelModel = require('../api/models/imovelModel')
let mongoose = require('mongoose')
let nodemailer = require('nodemailer')
let moment = require('moment')

module.exports = function verificaSeguro() {
  let cutoff = new Date()
  today = new Date()
  cutoff.setDate(cutoff.getDate() + 30)
  let transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    auth:{
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  imovelModel.find({'locatario.dataVencimentoSeguro': {$lt:cutoff, $gt:today}}).exec().then(imoveis => {
    if (imoveis.length) {
      try{

        console.log('transport created')
        let mailOptions = {
          from: 'notificacao@webyang.com.br',
          to: process.env.EMAIL_DESTINY,
            subject: 'Aviso: Vencimento de Seguro',
          html: createHtml(imoveis)
        }
        console.log("Enviando email de seguro")
        transporter.sendMail(mailOptions, err => {
          if(err)
            return console.log(err)

          console.log('Email sent')
        })
      } catch(ex) {
        console.log(ex)
      }
    }
  }).catch(err => {
    console.log(err)
    let mailOptions = {
      from: 'notificacao@webyang.com.br',
      to: 'alex.xmde@gmail.com',
      subject: '[mflores] erro no serviço de Seguro',
      html: `<h4 style="color:red">Erro: ${err}</h4>`
    }

    transporter.sendMail(mailOptions, err => console.log(err))

  })

  function createHtml(imoveis) {
    let tbody = ''
    imoveis.forEach(i => {
      tbody += `<tr>
    <td>${i.titulo}</td>
    <td>${moment(i.locatario.dataVencimentoSeguro).format('DD/MM/YYYY')}</td>
    </tr>`
    })
    let html = `<div>
  <span>Aviso: Próximos vencimentos de Seguros
  <table>
    <thead>
    <tr>
      <th>Imovel</th>
      <th>Vencimento do seguro</th>
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

