let jwt = require('jsonwebtoken')
let userModel = require('../models/userModel')

class LoginController {
  login(req, res) {
    let find = userModel.findOne(req.body).exec()
    if(!req.body.password || !req.body.username) {
      return res.status(404).send('Usuario ou senha não presentes')
    }
    find.then(user => {
      if(user) {
        let token = jwt.sign(user, 'shh')
        res.send(token)
      } else {
        res.status(404).send('Usuário não encontrado')
      }
    })
  }
}

module.exports = new LoginController()
