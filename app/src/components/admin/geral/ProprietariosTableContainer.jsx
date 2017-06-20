import React from 'react'
import ProprietarioStore from 
'../../../stores/admin/proprietarioStore.js'
import ProprietariosTable from './ProprietariosTable.jsx'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'

@observer
export default class ProprietariosTableContainer extends React.Component {
  constructor(props) {
    super(props)
    this.store = new ProprietarioStore()
  }
  componentDidMount() {
    this.store.getProprietarios()
  }
  render() {
    return(
    <ProprietariosTable 
      error_message={this.store.error_message}
      loaded={this.store.loaded}
      items={this.store.items}
      activePage={this.store.activePages}
      proprietarios={toJS(this.store.proprietarios)}
      onSelect={this.onSelect.bind(this)}
      search={this.store.search}
      handleSearchChange={this.handleSearchChange.bind(this)}
    />
  )
  }

  onSelect(page) {
    this.store.activePage = page
  }

  handleSearchChange(e) {
    this.store.search = e.target.value
    this.activePage = 1
    this.store.getProprietarios()
  }
}

