let imovelModel = require('../api/models/imovelModel')
let mongoose = require('mongoose')
let nodemailer = require('nodemailer')
let moment = require('moment')

module.exports = function verificaGarantia() {
  let cutoff = new Date()
  today = new Date()
  cutoff.setDate(cutoff.getDate() + 30)
  let transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    auth:{
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD    }
  })

  imovelModel.find({'locatario.dataFimValidadeGarantia': {$lt:cutoff, $gt:today}}).exec().then(imoveis => {
    if (imoveis.length) {
      try{

        console.log('transport created')
        let mailOptions = {
          from: 'notificacao@webyang.com.br',
          to: process.env.EMAIL_DESTINY,
          subject: 'Aviso: Vencimento de garantia',
          html: createHtml(imoveis)
        }
        console.log("Enviando email de garantia")
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
      subject: '[mflores] erro no serviço de garantia',
      html: `<h4 style="color:red">Erro: ${err}</h4>`
    }

    transporter.sendMail(mailOptions, err => console.log(err))

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

