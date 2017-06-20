let request = require('supertest')
let server = require('../../server')
let proprietarioModel = require('../../api/models/proprietarioModel')
let imovelModel = require('../../api/models/imovelModel')
require('dotenv').config()
let mongoose = require('mongoose')
let assert = require('chai').assert


describe('Consultas de proprietarios', () => {
  let app,
    proprietarioId

  beforeEach(done => {
    app = server.listen(process.env.TESTS_PORT, err => {
      if (err) 
        throw new Error(err)

      mongoose.connect(process.env.TESTS_DB_URI)
      proprietarioModel.remove({}, err => { 

        const cadastraProprietarios = [
          new proprietarioModel({nome: 'Alex Alonso'}).save(),
          new proprietarioModel({nome: 'Henrique Iglesias'}).save(),
          new proprietarioModel({nome: 'José da Silva Raimundo'}).save()
        ]

        Promise.all(cadastraProprietarios).then(proprietarios => {
          proprietarioId = proprietarios[0]._id
          let operations = [
            new imovelModel({titulo: 'Rua Charles, 01', proprietario: proprietarioId}).save(),
            new imovelModel({titulo: 'Rua Jhon Jones', proprietario: proprietarioId}).save(),
            new imovelModel({titulo: 'Rua Dhuningham, 14', proprietario: proprietarioId}).save()
          ]

          Promise.all(operations).then(() => {

            done()
          })
        })

      })
    })
  })

  afterEach(done => {
    app.close()
    done()
  })

  it('Lista os proprietarios em ordem alfabética', function(done) {
    request(app)
      .get('/proprietarios?page=1')
      .expect(200)
      .end((err, res) => {
        let proprietarios = res.body.proprietarios
        assert.equal(proprietarios[0].nome, 'Alex Alonso')
        assert.equal(proprietarios[1].nome, 'Henrique Iglesias')
        assert.equal(proprietarios[2].nome, 'José da Silva Raimundo')
        done()
      })
  })

  it('Lista, em orderm alfabética, os imóveis que pertencem a um determinado proprietario', done => {
    request(app)
      .get(`/proprietario/${proprietarioId}/imoveis`)
      .expect(200)
      .end((err, res) => {
        if (err) 
          throw new Error(err)
        let imoveis = res.body.imoveis

        assert.isArray(imoveis)
        assert.equal(imoveis.length, 3)
        assert.equal(imoveis[0].titulo, 'Rua Charles, 01')
        assert.equal(imoveis[1].titulo, 'Rua Dhuningham, 14')
        assert.equal(imoveis[2].titulo, 'Rua Jhon Jones')
        done()

      })
  })

  it('Pesquisa proprietarios por nome', done => {
    request(app)
      .get(`/proprietarios?nome=alex&page=1`)
      .expect(200)
      .end((err, res) => {
        if (err)
          throw new Error(err)

        const proprietarios = res.body.proprietarios

        assert.isArray(proprietarios)
        assert.lengthOf(proprietarios, 1)

        const proprietario = proprietarios[0]
        assert.equal(proprietario.nome, 'Alex Alonso')
        done()



      })
  })
})

