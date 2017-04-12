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
      host: 'smtp.zoho.com',
      port: 465,
      auth:{
        user:'notificacao@webyang.com.br',
        pass: 'cthulhu1'
      }
    })
    console.log('transport created')
    let mailOptions = {
      from: 'notificacao@webyang.com.br',
      to: 'alex.xmde@gmail.com',
      subject: 'Mensagem de contato',
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
