let nodemailer = require('nodemailer')
let config = require('../../config.js')

class ContactController {
 

  sendMessage(req, res) {
    function createHtml(body) {
      let html = `
    <div>
      <p>Nome: ${body.nome}</p>
      <p>Email: ${body.email}</p>
      <p>Mensagem: ${body.mensagem}</p>
    </div>
    `

      return html
    }

    let transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      auth:{
        user:'notificacao@webyang.com.br',
        pass: config.emailPassword
      }
    })
    let mailOptions = {
      from: 'notificacao@webyang.com.br',
      //      to: 'miriaflores@creci.org.br',
      subject: 'Mensagem do Website',
      html: createHtml(req.body)
    }
    transporter.sendMail(mailOptions, err => {
      if(err)
        return console.log(err)

      console.log('Email sent')
      res.send()
    })
  }
}

module.exports = new ContactController()
