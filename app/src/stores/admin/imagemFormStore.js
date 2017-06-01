import {action, observable, toJS} from 'mobx'
import config from '../config.js'
import {putJson, getJson} from '../fetch.js'

export default class ImagemFormStore {
  @observable imagens = []
  @observable showModal = false
  @observable imagem = {
    titulo: '',
    descricao: '',
    arquivo: ''
  }
  @observable error = ''
  @observable capa = ''
  @observable loading = false

  @action submitCapa(id) {
    let form_data = new FormData()
    form_data.append('arquivo', this.capa, 'arquivo')

    fetch(config.url + '/imovel/' + id + '/imagemPrincipal', {
      method:'PUT',
      body: form_data
    }).then(() => this.getImagens(id))
      .catch(err => this.erro = err)
  }

  @action saveImages(images, id) {
    this.loading = true
    let form_data = new FormData()
    for(let i = 0; i < images.length; i++)
      form_data.append(`arquivos`, images[i], 'arquivos'+i)

    let url = `${config.url}/imovel/${id}/addImages`
    fetch(url, {
      method:'POST',
      body: form_data
    }).then(() => {
      this.loading = false
      this.getImagens(id)
    })
  }
  @action saveImagem(id) {
    let url = config.url + '/imovel/' + id + '/addImage'
    let form_data = new FormData()
    form_data.append('titulo', this.imagem.titulo)
    form_data.append('descricao', this.imagem.descricao)
    form_data.append('arquivo', this.imagem.arquivo, 'arquivo')

    if(!this.imagem._id) {
      fetch(url, {
        method: 'POST',
        body: form_data
      }).then(() => {
        this.getImagens(id)
        this.showModal = false
      })
    } else {
      url = config.url + '/imovel/' + id + '/image/' + this.imagem._id
      fetch(url, {
        method: 'PUT',
        body: form_data
      }).then(() => {
        this.getImagens(id)
        this.showModal = false
      }).catch(err => {
        console.log(err)
        this.error = err
      })
    }
  }

  @action getImagens(id) {
    let url = config.url + '/imovel/' + id 
    getJson(url).then(imovel => {
      this.imagens = imovel.imagens
      this.capa = imovel.imagemPrincipal
    })
  }

  @action deleteImagem(id) {
    let url = config.url + '/imovel/' + id + '/deleteImage/' + this.imagem._id
    fetch(url, {
      method:'DELETE'
    }).then(() => {
      this.showModal = false
      this.getImagens(id)
    })
  }
}
