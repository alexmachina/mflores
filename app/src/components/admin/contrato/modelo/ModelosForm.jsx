import React from 'react'
import ModeloStore from '../../../../stores/admin/modeloStore.js'
import Input from '../../../utils/Input.jsx'
import { Row, Col, Jumbotron, Button, Glyphicon } from 'react-bootstrap'
import RichTextEditor from 'react-rte'
import { observer } from 'mobx-react'

@observer
export default class ModelosForm extends React.Component {
  constructor(props) {
    super(props)
    this.store = new ModeloStore()
  }

  componentDidMount() {
  }
  render() {
    return(
      <div>
        <Jumbotron className="admin-jumbotron text-center">
          <h1>Novo Modelo</h1>
        </Jumbotron>
        <div className="container">
        <form onSubmit={this.onSubmit}>
          <Input
            label="Título"
            value={this.store.modelo.titulo}
            onChange={this.onTituloChange.bind(this)}
          />
          <label>Corpo</label>
          <RichTextEditor
            value={this.store.modelo.corpo}
            onChange={this.onCorpoChange.bind(this)}
          />

        <Button type="submit" className="save-button" bsStyle="primary">
          Salvar
        </Button>
          
        </form>
      </div>

      </div>
    )
  }

  onSubmit(e){
    e.preventDefault()

  }

  onTituloChange(e) {
    this.store.modelo.titulo = e.target.value
  }

  onCorpoChange(e) {
    this.store.modelo.corpo = e
  }

  
}
