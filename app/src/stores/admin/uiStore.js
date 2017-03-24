import {observable, action, asStructure} from 'mobx'

export default class uiStore {
  @observable tabKey = 0
  @observable showModal = false
}
