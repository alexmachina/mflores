import React from 'react'
import ProprietariosImoveis from '../components/ProprietariosImoveis.jsx' 
import ProprietariosImoveisStore from '../../../../stores/admin/proprietariosImoveisStore.js'
import { observer } from 'mobx-react'

@observer
export default class ProprietariosImoveisContainer  extends React.Component {
  constructor(props) {
    super(props)
    this.store = new ProprietariosImoveisStore()

  }

  componentDidMount() {
    this.store.getImoveis(this.props.params.id)
    this.store.getNome(this.props.params.id)
  }
  render() {
    let pagination = {
      activeItem: this.store.activeItem,
      items: this.store.items,
      onSelect: this.onSelect.bind(this)
    }
    return(
      <ProprietariosImoveis
        pagination={pagination}
        nome={this.store.nome}
        imoveis={this.store.imoveis}
        error_message={this.store.error_message}
        loaded={this.store.loaded}
      />
      )
  }

  onSelect(page) {
    this.store.activeItem = page
  }
}
