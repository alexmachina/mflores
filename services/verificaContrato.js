let imovelModel = require('../api/models/imovelModel')
let mongoose = require('mongoose')
let nodemailer = require('nodemailer')
let moment = require('moment')

  module.exports = function verificaContrato() {
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

  imovelModel.find({'locatario.dataFimContrato': {$lt:cutoff, $gt:today}}).exec().then(imoveis => {
    if (imoveis.length) {
      try{
        let mailOptions = {
          from: 'notificacao@webyang.com.br',
          to: 'alex.xmde@gmail.com',
          subject: 'Aviso: Vencimento de Contrato',
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
  }).catch(err => {
    console.log(err)
    let mailOptions = {
      from: 'notificacao@webyang.com.br',
      to: 'alex.xmde@gmail.com',
      subject: '[mflores] erro no serviço de contrato',
      html: `<h4 style="color:red">Erro: ${err}</h4>`
    }

    transporter.sendMail(mailOptions, err => console.log(err))

  })

  function createHtml(imoveis) {
    let tbody = ''
    imoveis.forEach(i => {
      tbody += `<tr>
    <td>${i.titulo}</td>
      <td>${moment(i.locatario.dataFimContrato).format('DD/MM/YYYY')}</td>
    </tr>`
    })
    let html = `<div>
  <span>Aviso: Próximos vencimentos de Contrato
  <table>
    <thead>
    <tr>
      <th>Imovel</th>
      <th>Vencimento do contrato</th>
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

