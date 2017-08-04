import React from 'react'
import { Button, Row, Col, Jumbotron, Nav, NavItem } from 'react-bootstrap'
import ListItemLink from './ListItemLink.jsx'
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

  onSelect() {

  }

  componentDidMount() {
    this.store.getTitulo(this.props.id)
    console.log(this.context.router.isActive('/foo'))
  }

  render() {
    const id = this.props.id
    return(
    <Jumbotron className="admin-jumbotron">
      <Row>
        <div>
          <h2 className="text-center">{this.store.titulo}</h2>
        </div>
        <nav className="navbar navbar-default imovel-navbar">
          <div className="navbar-header text-center">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#imovel-nav">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className="container">
            <ul className="nav navbar-nav" id="imovel-nav">
              <li className={this.context.router.isActive(`/admin/imovel/${id}`) ? 'active' : ''}>
                <a href={`/#/admin/imovel/${id}`}>Imóvel</a>
              </li>
              <li className={this.context.router.isActive(`/admin/imovel/${id}/endereco`) ? 'active' : ''}>
                <a href={`/#/admin/imovel/${id}/endereco`}>Endereço</a>
              </li>
              <li className={this.context.router.isActive(`/admin/imovel/${id}/website`) ? 'active' : ''}>
                <a href={`/#/admin/imovel/${id}/website`}>Website</a>
              </li>
              <li className={this.context.router.isActive(`/admin/imovel/${id}/locatario`) ? 'active' : ''}>
                <a href={`/#/admin/imovel/${id}/locatario`}>Locatário</a>
              </li>
              <li className={this.context.router.isActive(`/admin/imovel/${id}/imagens`) ? 'active' : ''}>
                <a href={`/#/admin/imovel/${id}/imagens`}>Imagens</a>
              </li>
              <li className={this.context.router.isActive(`/admin/imovel/${id}/despesas`) ? 'active' : ''}>
                <a href={`/#/admin/imovel/${id}/despesas`}>Despesas</a>
              </li>
              <li className={this.context.router.isActive(`/admin/imovel/${id}/receitas`) ? 'active' : ''}>
                <a href={`/#/admin/imovel/${id}/receitas`}>Receitas</a>
              </li>
            </ul>
          </div>
        </nav>

      </Row>
    </Jumbotron>
    )
  }

  onSelect(key) {
    this.store.activeKey = key
  }
}

ImovelHeader.contextTypes = {
  router: React.PropTypes.object
}
