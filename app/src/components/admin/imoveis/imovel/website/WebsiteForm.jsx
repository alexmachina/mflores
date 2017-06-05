import React from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import Input from '../../../../utils/Input.jsx'
import WebsiteFormStore from '../../../../../stores/admin/websiteFormStore.js'
import { observer } from 'mobx-react'

@observer
export default class WebsiteForm extends React.Component {
  constructor(props) {
    super(props)
    this.store = new WebsiteFormStore()
  }

  componentDidMount() {
    this.store.getWebsite(this.props.id)
  }
  render() {
    return (
      <div className="container-fluid">
        <Row>
          <Col xs={12} md={8} mdOffset={2}>
            <form onSubmit={this.onSubmit.bind(this)}>
              <Input label="Titulo"
                value={this.store.website.titulo}
                onChange={this.onTituloChange.bind(this)}
              />
              <Input label="Subtitulo"
                value={this.store.website.subtitulo}
                onChange={this.onSubtituloChange.bind(this)}
              />
              <label>Descrição</label>
              <textarea value={this.store.website.descricao}
                onChange={this.onDescricaoChange.bind(this)}
                className="form-control"
              />

            <label>Disponível</label>
            <input type="checkbox"
              onChange={this.onDisponivelChange.bind(this)}
              checked={this.store.website.disponivel}
              className="form-control"

            />
            <label>Principal</label>
            <input type="checkbox"
              onChange={this.onPrincipalChange.bind(this)}
              checked={this.store.website.principal}
              className="form-control"
            />
            <label>Carrossel</label>
            <input type="checkbox"
              onChange={this.onCarrosselChange.bind(this)}
              checked={this.store.website.carrossel} 
              className="form-control"
            />
            <label>Homepage</label>
            <input type="checkbox"
              onChange={this.onHomepageChange.bind(this)}
              checked={this.store.website.homepage}
              className="form-control"
            />


          <Button style={this.store.buttonStyle} type="submit" className="save-button">
            {this.store.buttonText}
          </Button>
        </form>


      </Col>
    </Row>
  </div>
    )
  }

  onSubmit(e) {
    e.preventDefault()
    this.store.saveWebsite(this.props.id)
  }

  onTituloChange(e) {
    this.store.website.titulo = e.target.value
  }
  onSubtituloChange(e) {
    this.store.website.subtitulo = e.target.value
  }
  onDescricaoChange(e) {
    this.store.website.descricao = e.target.value
  }
  onDisponivelChange(e) {
    this.store.website.disponivel = e.target.checked
  }
  onPrincipalChange(e) {
    this.store.website.principal = e.target.checked
  }
  onCarrosselChange(e) {
    this.store.website.carrossel = e.target.checked
  }
  onHomepageChange(e) {
    this.store.website.homepage = e.target.checked
  }
}
