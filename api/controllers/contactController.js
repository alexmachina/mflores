let nodemailer = require('nodemailer')
let config = require('../../config.js')
console.log(config)

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
      debug: true,
      logger: true,
      host: 'smtp.zoho.com',
      port: 587,
      auth:{
        user:'notificacao@webyang.com.br',
        pass: config.emailPassword
      }
    })
    let mailOptions = {
      from: 'notificacao@webyang.com.br',
      to: 'miriaflores@creci.org.br',
      subject: 'Mensagem do Website',
      html: createHtml(req.body)
    }

    console.log('Sending mail')
    transporter.sendMail(mailOptions, (err)=> {
      if(err) {
        return res.status(500).send(err)
      }
      return res.send()
    })
  }
}

module.exports = new ContactController()
