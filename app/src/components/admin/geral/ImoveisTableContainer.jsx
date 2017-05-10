import React from 'react'
import ImoveisTableStore from '../../../stores/admin/imoveisTableStore.js'
import { Row, Col } from 'react-bootstrap'
import ImoveisTable from './ImoveisTable.jsx'
import { observer } from 'mobx-react'

@observer
export default class ImoveisTableContainer extends React.Component {
  constructor(props) {
    super(props)
    this.store = new ImoveisTableStore()
  }

  onSelect(page) {
    this.store.activePage = page
  }

  handleSearchChange(e) {
    this.store.search = e.target.value
    this.store.performSearch()
  }
  componentDidMount() {
    this.store.fetchImoveis()
  }

  render() {
    return (
    <ImoveisTable 
      imoveis={this.store.imoveis}
      items={this.store.items}
      activePage={this.store.activePage}
      onSelect={this.onSelect.bind(this)}
      search = {this.store.search}
      handleSearchChange={this.handleSearchChange.bind(this)}
    />
    )
  }
}
