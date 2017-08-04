import {observable, action} from 'mobx'
import Cookies from 'js-cookie'
import config from '../config.js'
import {postJson} from '../fetch.js'
import {hashHistory} from 'react-router'

export default class LoginStore {
  @observable username = ''
  @observable password = ''
  @observable message = ''
  @observable loading = false

  @action login() {
    let obj =  {
      username: this.username,
      password: this.password 
    }

    postJson(config.url + '/login', 
      obj
    )
      .then(token => {
        Cookies.set('token', token)
        if (obj.username == 'miria')
          Cookies.set('role','admin')
        else
          Cookies.set('role','user')
        hashHistory.push('/admin/imoveis')
      })
      .catch(err => this.message = err)

  }

  @action logout() {
    Cookies.remove('token')
    Cookies.remove('role')
    hashHistory.push('/admin')

  }


}
