import { observable, toJS, action } from 'mobx'
import config from '../../config.js'
  import { getJson, putJson, postJson } from '../../fetch.js'
import validator from 'validator'
import Cookies from 'js-cookie'


export default class UsuariosPageStore {
  @observable usuarios = []
  @observable loaded = true
  @observable erro = ''
  @observable showModal = false
  @observable user = {
    username: '',
    fullname: '',
    email: '',
    password: ''
  }
  @observable alert = {
    style: "",
    mensagem: ""
  }

  @observable role = Cookies.get('role')


  @action fetchUsuarios() {
    this.loaded = false
    getJson(`${config.url}/usuarios/`)
      .then(json =>  {
        this.usuarios = json 
        this.loaded = true
      })
      .catch(err => this.erro = err)
  }

  @action async getUser(username) {
    const url = `${config.url}/usuario/${username}`,
      response = await fetch(url)
      this.user = await response.json()
  }

  @action async saveUser(){
    if(this.validateUser()) {
      try {
        this.loaded = false
        const result = await this.sendRequest()
        this.loaded = true
        this.alert = {
          mensagem: 'Salvo com sucesso',
          style: 'success'
        }

      } catch(ex) {
        this.alert = {
          mensagem: ex.message,
          style: 'danger'
        }
      }
    } else {
      this.alert = {
        mensagem: "Há campos invalidos no formulário",
        style: "warning"
      }

    }

  }

  @action validateUser() {
    const user = this.user
    if (
      !user.username ||
      !user.fullname ||
      (!user.email || 
        !validator.isEmail(user.email)
      )
    ) return false
    else
      return true


  }

  @action async sendRequest() {

    try {
      const user = this.user,
        method = 
        user._id ? 'PUT' : 'POST',
        url =
        user._id ? 
        `${config.url}/usuario/${user._id}` :
        `${config.url}/usuario`,
        headers = new Headers( {
          'Accept':'application/json',
          'Content-Type': 'application/json'
        })
      let response = null
      if(method == 'POST') {
        response = 
          await fetch(url, {
            method,
            headers,
            body: JSON.stringify(toJS(user))
          })
        let user = await response.json()
        response = user
      } 
      else
        response = 
          await putJson(url, user)

      return response

    } catch (ex) {
      throw ex.message
    }
  }

  @action async deleteUser() {
    try {
      const url = `${config.url}/usuario/${this.user._id}`,
      response = await fetch(url, {
        method: 'DELETE'
      })

      if (response.ok)
        return
      else {
        const text = await response.text()
        throw new Error(text)
      }
        


    } catch (ex) {
      this.alert = {
        mensagem: ex.message,
        style: 'danger'
      }
    }
  }



}
