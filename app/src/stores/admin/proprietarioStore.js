import config from '../config.js'
import { observable, action, toJS} from 'mobx'
import { getJson, postJson, putJson  } from '../fetch.js'
import { hashHistory } from 'react-router'

export default class ProprietarioStore {
    @observable proprietarios = []


@observable selectedProprietario = {
    cpfCnpj : '',
    rgInscricao: '',
    nome: '',
    telefone: '',
    celular: '',
    email: '',
    endereco: {
        estado: null,
        cidade: null,
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
@observable estados = []
@observable cidades = []

@observable buttonText = 'Salvar'
@observable buttonStyle = {}

@action setProp(prop, value) {
    this.selectedProprietario[prop] = value
}
@action setEndProp(prop, value) {
    this.selectedProprietario.endereco[prop] = value
}

@action getEstados() {
    let url = `${config.url}/estados`
    getJson(url).then(estados => {
        this.estados = estados.map(e => {
            return { value: e._id, option:e.sigla}
        })
    })
}

@action getCidades(estadoId) {
    let url = `${config.url}/cidades/${estadoId}`
    getJson(url).then(cidades => {
        this.cidades = cidades.map(c => {
            return { value: c._id, option: c.nome}
        })
    })
}

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
