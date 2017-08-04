import React from 'react'
import { Col, Row, Jumbotron, Modal } from 'react-bootstrap'
import UsuariosPageStore from '../../../../stores/admin/usuarios/usuariosPageStore.js'
import { observer } from 'mobx-react'
import UsuariosTable from './UsuariosTable.jsx'
import Loader from 'react-loader'

@observer
export default class UsuariosPage extends React.Component {
  constructor(props) {
    super(props)
    this.store = new UsuariosPageStore()
  }
  componentDidMount() {
    this.store.fetchUsuarios()
  }

  onCellClick(user) {
    this.props.router.push(`/admin/sistema/usuario/${user.username}`)
  }

  onNewItemClick() {
    this.props.router.push('/admin/sistema/usuario')
  }
  render() {
    return(
      <div className="container-fluid">
        <Jumbotron className="admin-jumbotron text-center">
          <h1>Usuários</h1>
        </Jumbotron>
        <Row>
          <Col xs={12}>
            {this.store.erro ? (<span id="erro">Erro: {this.store.erro}</span> ) : (
              <div>
                <Loader loaded={this.store.loaded} >
                  <UsuariosTable usuarios={this.store.usuarios} 
                    onCellClick={this.onCellClick.bind(this)} 
                    onNewItemClick={this.onNewItemClick.bind(this)}
                  />
                </Loader>
              </div>
            )}
          </Col>
        </Row>
      </div>
    )
  }

}

