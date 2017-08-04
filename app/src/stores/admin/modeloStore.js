import { observable, action } from 'mobx'
import { getJson } from '../fetch.js'
import config from '../config.js'
import RichTextEditor from 'react-rte'


export default class ModeloStore {
  @observable modelos = []
  @observable count = 0
  @observable loaded = true
  @observable error = ''
  @observable modelo = {
    titulo: '',
    corpo: RichTextEditor.createEmptyValue()
  }

  @action getModelos(page) {
    this.loaded = false
    const pageUrl = `${config.url}/modelos/page/${page}`,
      countUrl = `${config.url}/modelos/count`

    let proms = [
      getJson(pageUrl),
      getJson(countUrl)
    ]

    Promise.all(proms).then(results => {
      let [modelos, count] = results

      this.modelos = modelos
      this.count = count

      this.loaded = true
    }).catch(err => {
      this.loaded = true
      this.error = err
    })

  }

}
