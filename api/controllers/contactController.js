let nodemailer = require('nodemailer')

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
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
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
