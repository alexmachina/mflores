import ProprietarioStore from '../../src/stores/admin/proprietarioStore.js'
import config from '../../src/stores/config.js'
import chai from 'chai'
let assert = chai.assert

describe('Proprietario Store', () => {
  let store
  beforeEach(done => {
    store = new ProprietarioStore()
    done()
  })
  it('Inicializa-se com propriedades vazias ou nulas', done => {
    assert.isEmpty(store.proprietarios)
      done()
  })

  it('Obtem uma página(10 itens) de proprietarios', done => {
    store.getPageOfProprietarios(1).then(proprietarios => {

      
    })

  })
})
