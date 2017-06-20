require('dotenv').config()
let request = require('supertest')
let server = require('../../server')
let mongoose = require('mongoose')
let assert = require('chai').assert
let proprietarioModel = require('../../api/models/proprietarioModel')

describe('CRUD de Proprietarios', () => {
  let app
  let _id
  const proprietario = {
    cpfCnpj: '339.700.948.01',
    rgInscricao: '40.750.329-8',
    nome: 'Alex Alonso',
    telefone: '9 4015-3018',
    celular: '9 7595-1164',
    email: 'alex.xmde@gmail.com',
    endereco : {
      estado: 'SP',
      cidade: 'Vargem Grande Paulista',
      cep: '06730-000',
      rua: 'Eugenio Manoel de Oliveira',
      numero: '216',
      bairro: 'Centro',
      complemento: '',
      pontoDeReferencia: 'Proximo ao Barcellos Dog'
    }
  }

  beforeEach((done) => {

    app = server.listen(process.env.TESTS_PORT, err => {
      if (err) {
        throw new Error(err)
      }
      mongoose.connect(process.env.TESTS_DB_URI)

      proprietarioModel.remove({}, err => {
        if (err)
          throw new Error(err)
        operations = []
        for (let i = 0; i < 20; i++) {
          newProprietario = new proprietarioModel(proprietario)
          operations.push(newProprietario.save())
        }

        Promise.all(operations).then(results => {
          _id  = results[results.length-1]._id
          done()
        })
      })
    })
  })

  afterEach(() => {
    app.close()
  })

  it('Cadastra um proprietario', done => {
    request(app)
      .post('/proprietario')
      .send(proprietario)
      .set('Accept','application/json')
      .end((err, res) => {
        if (err)
          console.log(err)

        done()

      })
  })

  it('Lista uma página (10 itens) de  proprietarios', done => {

    request(app)
      .get('/proprietarios?page=1')
      .expect(200)
      .end((err, res) => {
        let proprietarios = res.body.proprietarios
        assert.isArray(proprietarios, 'Resposta da requisição é um array')
        assert.isAbove(proprietarios.length, 0, 'array possui mais de 0 elementos')
        assert.isBelow(proprietarios.length, 11, 'Array possui 10 ou menos elementos')

        done()
      })
  })

  it('Lista os proprietários trazendo apenas os campos nome e _id', done => {
    request(app)
      .get('/proprietarios')
      .expect(200)
      .end((err, res) => {
        let proprietarios = res.body
        assert.isArray(proprietarios)
        assert.isUndefined(proprietarios[0].cpfCpnj)
        assert.isDefined(proprietarios[0].nome)
        assert.isDefined(proprietarios[1]._id)
        done()
      })
  })

  it('Lista um proprietario', done => {
    request(app)
      .post('/proprietario')
      .send(proprietario)
      .set('Accept', 'application/json')
      .end((end, res) => {
        let _id = res.body._id

        request(app)
          .get(`/proprietario/${_id}`)
          .expect(200)
          .end((err, res) => {
            let proprietario = res.body
            assert.isNotEmpty(proprietario)
            assert.isObject(proprietario)
            assert.property(proprietario, 'cpfCnpj')
            assert.isObject(proprietario.endereco)
            done()
          })
      })
  })

  it('Atualiza um proprietario', done => {
    let proprietarioAlterado = proprietario
    proprietarioAlterado.nome = 'Luiz Arnaldo'
    request(app)
      .put(`/proprietario/${_id}`)
      .set('Accept','application/json')
      .send(proprietarioAlterado)
      .end((err, res) => {
        let proprietario = res.body
        assert.isNotEmpty(proprietario)
        assert.isObject(proprietario)
        assert.property(proprietario, 'nome')
        assert.equal(proprietario.nome, 'Luiz Arnaldo')
        done()
      })

  })

  it('Remove um proprietario', done => {
    request(app)
      .delete(`/proprietario/${_id}`)
      .expect(200)
      .end((err, res) => {
        assert.equal(res.body.message, `Proprietario ${_id} deletado.`)
        request(app)
          .get(`/proprietario/${_id}`)
          .expect(404, done)
      })

  })
})
