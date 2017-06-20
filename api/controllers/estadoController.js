const estadoModel = require('../models/estadoModel')
const cidadeModel = require('../models/cidadeModel')

class EstadoController {
  getEstados(req, res) {
   const query =  estadoModel.find({}).select('_id sigla').exec()
   query.then(estados => {
     if(!estados.length)
       return res.status(404).send('Not found')

     res.json(estados)
   })

  }

  getCidades(req, res) {
    const query = cidadeModel.find({estado: req.params.estadoId}).exec()
    query.then(cidades => {
      if(!cidades.length)
        return res.status(404).send('Not found')

      return res.json(cidades)

    })
  }
}

module.exports = new EstadoController()
