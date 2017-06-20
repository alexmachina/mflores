import React from 'react'
import { Button, Row, Col, Jumbotron } from 'react-bootstrap'
import ImovelHeaderStore from '../../../stores/admin/geral/imovelHeaderStore.js'
import { observer } from 'mobx-react'
import { Link } from 'react-router'
import './styles.scss'


@observer
export default class ImovelHeader extends React.Component {
  constructor(props) {
    super(props)
    this.store = new ImovelHeaderStore()
    
  }

  componentDidMount() {
    this.store.getTitulo(this.props.id)
  }
  render() {
    const id = this.props.id
    return(
    <Jumbotron className="admin-jumbotron">
      <h2 className="text-center">{this.store.titulo}</h2>
      <Row>
        <Col xs={12} smOffset={2}>
          <Link to={`/admin/imovel/${id}/`} className="link" activeClassName="active">
            <Button bsSize="lg" bsStyle="default">
              Imovel
            </Button>
          </Link>
          <Link to={`/admin/imovel/${id}/endereco`} className="link" activeClassName="active">
            <Button bsSize="lg" bsStyle="default">
              Endereço
            </Button>
          </Link>

          <Link to={`/admin/imovel/${id}/website`} className="link" activeClassName="active" > 
            <Button bsSize="lg" bsStyle="default">
              Website
            </Button>
          </Link>
          <Link to={`/admin/imovel/${id}/proprietario`} className="link" activeClassName="active" > 
            <Button bsSize="lg" bsStyle="default">
              Proprietario
            </Button>
          </Link>
          <Link to={`/admin/imovel/${id}/locatario`} className="link" activeClassName="active" > 
            <Button bsSize="lg" bsStyle="default">
              Locatario
            </Button>
          </Link>
          <Link to={`/admin/imovel/${id}/imagens`} className="link" activeClassName="active" > 
            <Button bsSize="lg" bsStyle="default">
              Imagens
            </Button>
          </Link>
          <Link to={`/admin/imovel/${id}/despesas`} className="link" activeClassName="active" > 
            <Button bsSize="lg" bsStyle="default">
              Despesas
            </Button>
          </Link>
          <Link to={`/admin/imovel/${id}/receitas`} className="link" activeClassName="active" > 
            <Button bsSize="lg" bsStyle="default">
              Receitas
            </Button>
          </Link>


        </Col>
      </Row>
    </Jumbotron>
  )
}
}

