let proprietarioModel = require('../models/proprietarioModel')
let imovelModel = require('../models/imovelModel')

function _getAllProprietarios() {
 return new Promise((resolve, reject) => {
      let query = proprietarioModel.find({})
        .select('_id nome')
        .sort({nome: 1})
        .exec()

      query.then(proprietarios => {
        resolve(proprietarios)
      })
 })
}

function _getPageOfProprietarios(page) {
  return new Promise((resolve, reject) => {
    let query = proprietarioModel.find({})
      .select('_id nome')
      .sort({ nome: 1 })
      .limit(10)
      .skip((page -1) * 10)
      .exec()

    let count = proprietarioModel.count({})

    Promise.all([query, count]).then(results => {
      let [proprietarios, count] = results
      resolve({count,proprietarios})
    }).catch(err => reject(err))




  })
}

function _getAllImoveis(proprietarioId) {
  return new Promise((resolve, reject) => {
    const query = imovelModel.find({proprietario: proprietarioId})
      .select('_id titulo')
      .exec()

    query.then(imoveis => {
      resolve(imoveis)
    }).catch(err => reject(err))
  })

}

function _getPageOfImoveis(proprietarioId, page) {
  return new Promise((resolve, reject) => {
    const query = imovelModel.find({proprietario: proprietarioId})
      .limit(10)
      .skip((page -1) * 10)
      .select('_id titulo')
      .sort({titulo: 1})
      .exec()
    const count = imovelModel.count({proprietario: proprietarioId})
      .exec()

    Promise.all([query, count]).then(results => {
      const [imoveis, count] = results
      resolve({imoveis, count})
    })

  })
}

function _getPageOfProprietariosByName(nome, page) {
  return new Promise((resolve, reject) => {
    const query = proprietarioModel
      .find({nome: new RegExp(nome, 'i')})
      .select('_id nome')
      .limit(10)
      .skip((page -1) * 10)
    const count = proprietarioModel.count({nome: new RegExp(nome, 'i')})

    
    Promise.all([query, count]).then(results => {
      let [proprietarios, count] = results

      resolve({proprietarios, count})
    })
  })
}

module.exports = {
  addProprietario: function(req, res) {
    let proprietario = new proprietarioModel(req.body)

    proprietario.save().then((newProprietario) => {

      return res.json({'_id' : newProprietario._id})

    }).catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
  },

  getProprietarios: function (req, res) {
    if (req.query.page && req.query.nome) { 
      _getPageOfProprietariosByName(req.query.nome, req.query.page).then(results => {
        if (!results.proprietarios.length || results.proprietarios.count == 0)
          return res.status(404).send('Not found')

        return res.json(results)

      })
    } else if(req.query.page) {
      //Busca apenas a página
      _getPageOfProprietarios(req.query.page)
        .then(results => {
          if (results.proprietarios.length) {
            res.json(results)
          } else {
            res.status(404).send('Not found')
          }
        })
    } else {
      //Busca todos os proprietarios
      _getAllProprietarios().then(proprietarios => {
        if (proprietarios.length) {
          res.json(proprietarios)
        } else {
          res.status(404).send('Not found')
        }
      })
    }
  },

  getProprietario: function (req, res) {
    proprietarioModel.findById(req.params.id, (err, proprietario) => {
      if (err)
        return res.status(500).send(err)
      if(!proprietario) 
        return res.status(404).send('Not found!')

      return res.json(proprietario)
    })
  },

  getImoveis: function (req, res) {
    proprietarioModel.findById(req.params.id, (err, proprietario) => {
      if (err) {
        console.log(err)
        return res.status(500).send(err)
      }
      if (!proprietario)
        return res.status(404).send('Not found')

      const proprietarioId = proprietario._id

      if (!req.query.page)  {
        _getAllImoveis(proprietarioId).then(imoveis => {
          if (!imoveis.length)
            return res.status(404).send('Not found')

          res.json(imoveis)
        }).catch(err => { 
          console.log(err)
          res.status(500).send(err)
        })
      } else {
        _getPageOfImoveis(proprietarioId, req.query.page).then(results => {
          if (!results.imoveis.length || results.count == 0)
            return res.status(404).send('Not found')

          res.json(results)
        }).catch(err => {
          console.log(err)
          res.status(500).send(err)
        })
      }


    })
  },

  updateProprietario: function (req, res) {
    proprietarioModel.findByIdAndUpdate(req.params. id,
      {$set : req.body},
      { new : true },
      (err, proprietario) => {
        if (err) 
          return res.status(500).send(err)

        return res.json(proprietario)
      })
  },

  removeProprietario: function (req, res) {
    proprietarioModel.remove({'_id' : req.params.id}, (err) => {
      if (err)
        return res.status(500).send(err)

      return res.json({message: `Proprietario ${req.params.id} deletado.`})
    })
  },



  _getPageOfProprietarios: function(page) {

  }
}
