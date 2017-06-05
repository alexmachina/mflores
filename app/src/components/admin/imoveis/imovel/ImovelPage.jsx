import React from 'react'
import {Col, Row, Tabs, Tab, Jumbotron} from 'react-bootstrap'
import ImovelStore from '../../../../stores/admin/imovelStore.js'
import {observer} from 'mobx-react'
import ImovelForm from './ImovelForm.jsx'
import "./styles/formStyles.scss"
import ImovelHeader from '../../geral/ImovelHeader.jsx'

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
        <ImovelHeader id={this.props.params.id} />
        <ImovelForm id={this.props.params.id} />
      </div>
    )
  }

  handleTabSelect(key) {
    this.store.tabIndex = key
  }
}
