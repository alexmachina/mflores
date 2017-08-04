const mongoose = require('mongoose'),
  modeloModel = require('../../api/models/modeloModel'),
  assert = require('chai').assert,
  request = require('supertest'),
  server = require('../../server'),
  faker = require('faker')
  require('dotenv').config()

describe('Modelo CRUD', done => {
  let mockModelo = null,
    app = null
  before(done => {

    app = server.listen(process.env.TESTS_PORT, err => {
      if (err) 
        throw new Error(err)

      mongoose.connect(process.env.TESTS_DB_URI)

      modeloModel.remove({}, err => {
        if(err) 
          throw new Error(err)

        let promises = []

        for(let i = 0; i < 15; i++) {
          const modelo = {
            tituloModelo: faker.lorem.words(),
            tituloContrato: faker.lorem.words()
            },
            model = new modeloModel(modelo)
            promises.push(model.save())
        }

        Promise.all(promises).then(modelos => {
          const index = faker.random.number({min: 0, max: 9})
          mockModelo = modelos[index]
          done()
        })

      })
    })



  })

  it('Insere um modelo', done => {
    const modelo = {
      tituloContrato: faker.lorem.words(),
      tituloModelo: faker.lorem.words(),
      corpo: faker.lorem.text()
    },
      url = '/modelo'

    request(app)
      .post(url)
      .set('Accept','application/json')
      .send(modelo)
      .expect(200)
      .end((err, res) => {
        if (err)
          throw new Error(err)

        assert.equal(modelo.tituloContrato, res.body.tituloContrato)
        assert.equal(modelo.corpo, res.body.corpo)
        done()
      })
      
  })


  it('Atualiza um modelo', done => {
    const modeloId = mockModelo._id,
      url = `/modelo/${modeloId}`,
      modelo = { tituloModelo: 'Novo titulo', corpo: 'Nova clausula' }

    request(app)
      .put(url)
      .send(modelo)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err)
          throw new Error(err)

        const novoModelo = res.body

        assert.equal(novoModelo.tituloModelo, modelo.tituloModelo)
        assert.equal(novoModelo.corpo, modelo.corpo)
        done()


      })
  })

  it('Obtem página de modelo', done => {
    const url = '/modelos/page/1'

    request(app)
      .get(url)
      .expect(200)
      .end((err, res) => {
        if (err)
          throw new Error(err)

        const modelos = res.body
        assert.equal(modelos.length, 10)
        done()
      })
  })

  it('Obtem todos os modelos', done => {
    const url = '/modelos'

    request(app)
      .get(url)
      .expect(200)
      .end((err, res) => {
        if (err)
          throw new Error(err)

        const modelos = res.body

        assert.equal(modelos.length, 16)
        done()
      })
  })
})


