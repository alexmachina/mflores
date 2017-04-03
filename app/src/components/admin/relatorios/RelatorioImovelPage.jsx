import React from 'react'
import { observer } from 'mobx-react'
import { Jumbotron, Row, Col } from 'react-bootstrap'
import RelatorioImovelStore from '../../../stores/admin/relatorios/relatorioImovelStore.js'

@observer
export default class RelatorioImovelPage extends React.Component {
  constructor(props) {
    super(props)
    this.store = new RelatorioImovelStore()
  }

  componentDidMount() {
    this.store.getImovel(this.props.params.id)
    this.store.generatePdf()
  }

  render() {
    return(
      <h1>Hello</h1>
    )
  }
}
