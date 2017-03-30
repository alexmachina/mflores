import {observable, toJS, action} from 'mobx'
import config from '../config.js'
import {getJson, putJson} from '../fetch.js'

export default class WebsiteFormStore {
  @observable website = {
    descricao: '',
    principal: false,
    carrossel: false,
    homepage: false,
    subtitulo: '',
    titulo: '',
    disponivel: false
  }

  @observable buttonText = 'Salvar'
  @observable buttonStyle = {}

  @action getWebsite(id) {
    let url = config.url + '/imovel/'+id
    getJson(url).then(imovel => {
      this.website = imovel.website
    })
  }

  @action saveWebsite(id) {
    putJson(config.url + '/imovel/' + id, { website: toJS(this.website)})
      .then(() => { 
        this.buttonText = 'Salvo'
        this.buttonStyle = {backgroundColor: '#7fc857', color: 'white'}
      
        setTimeout(() => {
          this.buttonText = 'Salvar'
          this.buttonStyle = {}
        }, 3000)
      })
      }


}
