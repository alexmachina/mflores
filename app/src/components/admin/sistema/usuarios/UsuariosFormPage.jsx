import React from 'react'
import UsuariosPageStore from '../../../../stores/admin/usuarios/usuariosPageStore.js'
import  { observer } from 'mobx-react'
import UsuariosForm from './UsuariosForm.jsx'
import Loader from 'react-loader'
import { Jumbotron, Row, Col, Button } from 'react-bootstrap'
import Cookies from 'js-cookie'
import { Link } from 'react-router'

@observer
export default class UsuariosPage extends React.Component {
  constructor(props) {
    super(props)
    this.store = new UsuariosPageStore()
  }

  componentDidMount() {
    const username = this.props.params.username
    if (username)
      this.store.getUser(username)
  }

  onSubmit(e) {
    e.preventDefault()
    this.store.saveUser()
  }

  onUserPropChange(prop, value) {
    this.store.user[prop] = value
  }

  async onDelete() {
    await this.store.deleteUser() 
    this.props.router.push('/admin/sistema/usuarios')
    
    }

  render() {
    return (
      <div>
      <Jumbotron className="admin-jumbotron text-center">
      <h1>Usuario</h1>
      </Jumbotron>
      <div className="container">
        <Row>
          <Link to="/admin/sistema/usuarios">
            <Button bsStyle="default" bsSize="lg" style={{marginBottom:25}}>
              Voltar
            </Button>
          </Link>
        </Row>
        <Row>
          <Col xs={12}>
            <Loader loaded={this.store.loaded}>
              <UsuariosForm 
                ref={(input) => { this.usuariosForm = input }}
                user={this.store.user}
                onSubmit={this.onSubmit.bind(this)}
                onUserPropChange={this.onUserPropChange.bind(this)}
                alert={this.store.alert}
                role={this.store.role}
                onDelete={this.onDelete.bind(this)}

              />
            </Loader>
          </Col>
        </Row>
      </div>
    </div>
    )
  }
}
