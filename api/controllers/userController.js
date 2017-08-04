const userModel = require('../models/userModel')

class UserController {
  getUsers(req, res) {
    userModel.find({}).then(users => res.json(users))
      .catch(err => res.status(500).send(err))
  }

  addUser(req, res) {
    const user = new userModel(req.body)

    user.save().then(user => res.json({user}))
      .catch(err => res.status(500).send(err))

  }

  getUser(req, res) {
    userModel.findOne({username: req.params.username})
      .then(user => res.json(user))
      .catch(err => res.status(500).send(err))
  }

  updateUser(req, res) {
    userModel.findByIdAndUpdate(req.params.id,
      {$set: req.body}).then(() => {
       return res.send()
      })
      .catch(err => res.status(500).send(err))
  }

  deleteUser(req, res) {
    userModel.findByIdAndRemove(req.params.id)
      .then(() => res.send())
      .catch(err => res.status(500).send(err))
  }
}



module.exports = new UserController()
