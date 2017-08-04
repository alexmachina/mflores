const imovelModel = require('../../api/models/imovelModel'),
  proprietarioModel = require('../../api/models/proprietarioModel'),
  estadoModel = require('../../api/models/estadoModel'),
  cidadeModel = require('../../api/models/cidadeModel'),
  mongoose = require('mongoose'),
  faker = require('faker'),
  insereCidadesEstados = require('../../scripts/insereCidadesEstados')

require('dotenv').config()

module.exports = function() {
  return new Promise((resolve, reject) => {
    insereCidadesEstados(process.env.TESTS_DB_URI)
      .then(() => getEstadoECidade())
      .then(estadoCidade => InsertProprietarios(estadoCidade))
      .then(proprietarios => InsereImoveis(proprietarios))
      .then(imoveis => resolve(imoveis))
      
  })
}

function getEstadoECidade() {
  return new Promise((resolve, reject) => {
    const queryEstado = estadoModel.find({}).exec()
    
    queryEstado.then(estados => {
      const index = faker.random.number({min: 0, max: 10}),
        estado = estados[index],
        queryCidade = cidadeModel.find({estado: estado._id}).exec()

      queryCidade.then(cidades => {
        const index = faker.random.number({min: 0, max: 10}),
          cidade = cidades[index]

        resolve([estado,cidade])
      })

    })
  })
}

function InsereImoveis(proprietarios) {
  return new Promise((resolve, reject) => {
    let proms = []

    for (let i = 0; i <= 14; i++) {
      const index = faker.random.number({min:0, max: 10}),
        proprietario = proprietarios[index],
                imovel = {
          titulo: faker.lorem.words(),
          rgi: faker.random.number(),
          instalacao: faker.random.words(),
          capacidadeInstalada: faker.random.number(),
          capacidadeDisponivel: faker.random.number(),
          observacaoGestor: faker.lorem.sentence(),
          zoneamento: faker.lorem.words(),
          tipo: faker.lorem.words(),
          imagemPrincipal: faker.image.imageUrl(),
          precoVenda: faker.random.number(),
          precoLocacao: faker.random.number(),
          valorCondominio: faker.random.number(),
          IPTU: faker.lorem.words(),
          valorAnualIPTU: faker.random.number(),
          valorParceladoIPTU: faker.random.number(),
          endereco: proprietario.endereco,
          proprietario: proprietario._id,
          locatario: {
            cpfCnpj: faker.random.number(),
            nome: faker.name.firstName() + faker.name.lastName(),
            rgInscricao: faker.random.number(),
            responsavel: faker.name.firstName() + faker.name.lastName(),
            telefone: faker.random.number(),
            celular: faker.random.number(),
            email: faker.internet.email(),
            dataInicioContrato: faker.date.past(),
            dataFimContrato: faker.date.future(),
            valor: faker.random.number(),
            indiceDeReajuste: faker.random.number(),
            seguro: false,
            garantia: faker.random.words(),
            descricaoGarantia: faker.lorem.sentence(),
            dataInicioValidadeGarantia: faker.date.past(),
            dataFimValidadeGarantia: faker.date.future(),
            dataVencimentoSeguro: faker.date.future()
          },
          website: {
            descricao: faker.lorem.sentence(),
            principal: false,
            carrossel: false,
            homepage: true,
            subtitulo: faker.lorem.sentence(),
            titulo: faker.lorem.words(),
            disponivel: true
          }

        },
        Imovel = new imovelModel(imovel)

      proms.push(Imovel.save())

    }

    Promise.all(proms).then(imoveis => {
      resolve(imoveis)
    })


  })
}

function InsertProprietarios(estadoCidade) {
  return new Promise((resolve, reject) => {
    const proms = []

    for(let i = 0; i < 14; i++) {
      const proprietario = {
        cpfCpnj: faker.random.number(),
        rgInscricao: faker.random.number(),
        nome: faker.name.firstName(),
        telefone: faker.phone.phoneNumber(),
        celular: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        endereco: {
          estado: estadoCidade[0]._id,
          cidade: estadoCidade[1]._id,
          cep: faker.address.zipCode(),
          rua: faker.address.streetName(),
          bairro: faker.lorem.words(),
          complemento: faker.lorem.words(),
          pontoDeReferencia: faker.lorem.sentence()
        }
      }

      const fn = function() {
        return new Promise((resolve, reject) => {
          new proprietarioModel(proprietario).save()
            .then(proprietario => {
                resolve(proprietario)
            })
        })
      }

      proms.push(fn())

    }

    Promise.all(proms).then(proprietarios => {
      resolve(proprietarios)
    }
    ).catch(err => reject(err))


  })
}

