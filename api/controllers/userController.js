const userModel = require('../models/userModel')

class UserController {
  getUsers(req, res) {
    userModel.find({}).then(users => res.json(users))
      .catch(err => res.status(500).send(err))
  }

  addUser(req, res) {
    const user = new userModel(req.body)

    user.save().then(() => res.send())
      .catch(err => res.status(500).send(err))

  }

  getUser(req, res) {
    userModel.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.status(500).send(err))
  }

  updateUser(req, res) {
    userModel.findByIdAndUpdate(req.params.id,
      {$set: req.body}).then(() => res.send())
      .catch(err => res.status(500).send(err))
  }
}



module.exports = new UserController()
