const mongoose = require('mongoose'),
  contratoModel = require('../../api/models/contratoModel'),
  modeloModel = require('../../api/models/modeloModel'),
  request = require('supertest'),
  assert = require('chai').assert,
  server = require('../../server'),
  faker = require('faker'),
  populate = require('../helpers/populate')
require('dotenv').config()


describe('Contrato CRUD Operations', () => {
  let app = null
  let mockModelo = null
  let mockContrato = null
  let imovel = null
  before(done => {
    app = server.listen(process.env.TESTS_PORT, err => {
      if (err)
        throw new Error(err)

      mongoose.connect(process.env.TESTS_DB_URI)
      populate().then(imoveis => {
        const index = faker.random.number({min:0,max:10})
        imovel = imoveis[index]

        contratoModel.remove({}, err => {
          if (err)
            throw new Error(err)

          let modelo = {
            tituloModelo: faker.lorem.words(),
            tituloContrato: faker.lorem.words(),
            corpo: faker.lorem.text()
          }

          let Modelo = new modeloModel(modelo)

          Modelo.save()
            .then(modelo => {

              let promises = []
              for (let i = 0; i < 14; i++) {
                const contrato = {
                  titulo: faker.lorem.words(),
                  modelo: modelo._id,
                  corpo: faker.lorem.text(),
                  imovel: imovel._id,
                  proprietario: imovel.proprietario
                },
                  Contrato = new contratoModel(contrato)

                promises.push(Contrato.save())
              }

              Promise.all(promises)
                .then(contratos => {
                  const index = faker.random.number({min: 0, max: 15})
                  mockContrato = contratos[index]
                  console.log(mockContrato)
                  mockModelo = modelo

                  done()
                })
                .catch(err => { throw new Error(err)})
            }).catch(err => { throw new Error(err) })
        })
      }).catch(err => { throw new Error(err)})
    })

  })

  it('Adiciona um novo contrato', done => {
    const contrato = {
      titulo: faker.lorem.words(),
      modelo: mockModelo._id,
      corpo: faker.lorem.text(),
      imovel: imovel._id,
      proprietario: imovel.proprietario
    }, url = '/contrato'

    request(app)
      .post(url)
      .send(contrato)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err)
          throw new Error(err)

        assert.equal(contrato.titulo, res.body.titulo)
        done()
      })
  })

  it('Atualiza um contrato', done => {
    const url = `/contrato/${mockContrato._id}`,
      novoContrato = {
        titulo: 'Novo titulo'
      }

    request(app)
      .put(url) 
      .set('Accept', 'application/json')
      .send(novoContrato)
      .expect(200)
      .end((err, res) => {
        if (err)
          throw new Error(err)

        const contratoAtualizado = res.body

        assert.equal(novoContrato.titulo, contratoAtualizado.titulo)
        done()
      })

  })

  it('Obtem um contrato pelo _id', done => {
    const url = `/contrato/${mockContrato._id}`

    request(app)
      .get(url)
      .expect(200)
      .end((err, res) => {
        if (err) 
          throw new Error(err)

        assert.property(res.body, 'titulo')
        done()
      })
  })

  it('Obtem uma página de contratos', done => {
    const url='/contratos/page/1'

    request(app)
      .get(url)
      .expect(200)
      .end((err, res) => {
        if (err)
          throw new Error(err)

        assert.isArray(res.body)
        assert.equal(res.body.length, 10)
        done()
      })
  })

  it('Obtem a contagem dos contratos', done => {
    const url = '/contratos/count'

    request(app)
      .get(url)
      .expect(200)
      .end((err, res) => {
        if (err)
          throw new Error(err)

        assert.equal(res.body.count, 15)
        done()
      })
  })

  it('Obtem contratos por _id do modelo', done => {
    const url = `/modelo/${mockModelo._id}/contratos`
    request(app)
      .get(url)
      .expect(200)
      .end((err, res) => {
        if (err)
          throw new Error(err)

        assert.isArray(res.body)
        assert.property(res.body[0], 'titulo')
        done()
      })
  })

  it('Deleta um contrato', done => {
    const url = `/contrato/${mockContrato._id}`

    request(app)
      .delete(url)
      .expect(200)
      .end((err, res) => {
        if (err)
          throw new Error(err)

        assert.property(res.body, 'message')
        done()
      })
  })
})
