import React from 'react'
import {Col, Row, Tabs, Tab} from 'react-bootstrap'
import ImovelStore from '../../../stores/admin/imovelStore.js'
import {observer} from 'mobx-react'
import ImovelForm from './ImovelForm.jsx'
import EnderecoForm from './EnderecoForm.jsx'
import LocatarioForm from './LocatarioForm.jsx'
import ProprietarioForm from './ProprietarioForm.jsx'
import ImagensForm from './ImagensForm.jsx'
import "./styles/formStyles.scss"

@observer
export default class ImovelPage extends React.Component{
  componentDidMount() {
    this.store.getImovel(this.props.params.id)
  }
  constructor(props) {
    super(props)
    this.store = new ImovelStore()
  }
  render() {
    return (
      <div>
        <h2>
          {this.store.imovel.titulo}
        </h2>
        <Tabs id="tabs" 
          activeKey={this.store.tabIndex} 
          onSelect={this.handleTabSelect.bind(this)}>
          <Tab eventKey={1} title="Imovel">
            <ImovelForm id={this.props.params.id} />
          </Tab>
          <Tab eventKey={2} title="Endereço">
            <EnderecoForm id={this.props.params.id} />
          </Tab>
          <Tab eventKey={3}  title="Locatario">
            <LocatarioForm id={this.props.params.id} />
          </Tab>
          <Tab eventKey={4} title="Proprietario">
            <ProprietarioForm id={this.props.params.id} />
          </Tab>
          <Tab eventKey={5} title="Imagens">
            <ImagensForm id={this.props.params.id} />
          </Tab>
        </Tabs>
      </div>
    )
  }

  handleTabSelect(key) {
    this.store.tabIndex = key
  }
}
