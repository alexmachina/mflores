import config from '../config.js'
import { observable, action, toJS} from 'mobx'
import { getJson, postJson, putJson  } from '../fetch.js'
import { hashHistory } from 'react-router'

export default class ProprietarioStore {
  @observable proprietarios = []

  @observable schemaEndereco = {
    type: 'schema',
    estado: {
      label: 'Estado'
    },
    cidade: {
      label: 'Cidade'
    },
    cep: {
      label: 'CEP'
    },
    rua: {
      label: 'Rua'
    },
    numero: {
      label: 'Numero'
    },
    bairro: {
      label: 'Bairro'
    },
    complemento: {
      label: 'Complemento'
    },
    pontoDeReferencia: {
      label: 'Ponto de Referencia'
    }

      
  }

  @observable schema = {
    cpfCnpj: {
      label: 'CPF/CNPJ'
    },
    rgInscricao: {
      label: 'RG/Inscrição'
    },
    nome: {
      label: 'Nome'
    },
    telefone: {
      label: 'Telefone'
    },
    celular: {
      label: 'Celular'
    },
    email: {
      label: 'Email'
    },

    endereco: this.schemaEndereco
    

  }

  @observable selectedProprietario = {
    cpfCnpj : '',
    rgInscricao: '',
    nome: '',
    telefone: '',
    celular: '',
    email: '',
    endereco: {
      estado: '',
      cidade: '',
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      complemento: '',
      pontoDeReferencia: ''
    }
  }

  @observable activePage = 1
  @observable items = 0
  @observable loaded = true
  @observable error_message = ''
  @observable search = ''
  @observable showDeleteModal = false
  

  @observable buttonText = 'Salvar'
  @observable buttonStyle = {}

  @action getProprietarios() {
    this.loaded = false
    this.proprietarios = []
    let url = `${config.url}/proprietarios?page=${this.activePage}` 
    if (this.search)
      url = url + `&nome=${this.search}`
    console.log(url)
    getJson(url)
      .then(res => { 
        this.proprietarios = res.proprietarios
        this.items = Math.ceil(res.count / 10)
        this.loaded = true
      }).catch(err => {
        this.loaded = true
        this.error_message = err
      })

  }

  

  @action getProprietario(_id) {
    this.loaded = false
    getJson(`${config.url}/proprietario/${_id}`)
      .then(proprietario => {
        this.selectedProprietario = proprietario
        this.loaded = true
      }).catch(err => {
        this.loaded = true
        this.error_message = err
      })
  }

  @action addProprietario() {
    this.loaded = false
    postJson(`${config.url}/proprietario`,toJS(this.selectedProprietario))
      .then(() => {
        this.loaded = true
        hashHistory.push('/admin/proprietarios')

      }).catch(err => {
        this.loaded = true
        this.error_message = err
      })

  }

  @action updateProprietario() {
    this.loaded = false
    putJson(`${config.url}/proprietario/${this.selectedProprietario._id}`, toJS(this.selectedProprietario))
      .then(() => {
        this.buttonText = 'Salvo'
        this.buttonStyle = { backgroundColor: 'green' }
        setTimeout(() => {
          this.buttonText = 'Salvar'
          this.buttonStyle = {}
        }, 3000)


      })

  }

  @action deleteProprietario() {
    this.loaded = false
    const url = `${config.url}/proprietario/${this.selectedProprietario._id}`
    fetch(url,{
      method: 'DELETE'
    }).then(response => {
      if (response.ok) {
        this.loaded = true
        this.showDeleteModal = false
        hashHistory.push('/admin/proprietarios')
        
      } else {
        response.text().then(text => {
          this.error_message = text
          this.loaded = true
          this.showDeleteModal = false
        })
      }
    })
  }

}
