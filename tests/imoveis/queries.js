let server = require('../../server')
require('dotenv').config()
let mongoose = require('mongoose')
let imovelModel = require('../../api/models/imovelModel')
let request = require('supertest')
let assert = require('chai').assert

describe('Consultas de imoveis', () => {
  let app
  beforeEach((done) => {
    app = server.listen(process.env.TESTS_PORT, err => {
      if (err) {
        throw new Error(err)
      }
      mongoose.connect(process.env.TESTS_DB_URI)

      imovelModel.remove({}, err => {
        if(err)
          throw new Error(err)

        done()
      })
    })
  })

  afterEach((done) => {
    app.close()
    done()
  })

  it('Busca os imóveis por ordem alfabética', (done) => {
    let imovel1 = {
      titulo: 'Rua Alexandre Vieira, 234'
    }
    let imovel2 = {
      titulo:'Rua Corona Australis, 12'
    }

    let imovel3 = {
      titulo: 'Rua Balsamico Amaro, 43'
    }
    let operations = [new imovelModel(imovel1).save(), new imovelModel(imovel2).save(),
      new imovelModel(imovel3).save()]

    Promise.all(operations).then(results =>{
      request(app)
        .get('/imoveis?page=1')
        .expect(200)
        .end((err, res) => {
          imoveis = res.body.imoveis
          console.log(res.body.count)
          assert.equal(imoveis[0].titulo, 'Rua Alexandre Vieira, 234')
          assert.equal(imoveis[1].titulo, 'Rua Balsamico Amaro, 43')
          assert.equal(imoveis[2].titulo, 'Rua Corona Australis, 12')
          done()
        })
    })
  })
})
