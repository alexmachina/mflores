import React from 'react'
import { Col, Row, Jumbotron, Modal } from 'react-bootstrap'
import UsuariosPageStore from '../../../../stores/admin/usuarios/usuariosPageStore.js'
import { observer } from 'mobx-react'
import UsuariosTable from './UsuariosTable.jsx'

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
    alert(user.fullName)
  }
  render() {
    let msgCarregando = null
    if (this.store.fetching) {
      msgCarregando = <h3 id="loading">Carregando...</h3>
    }
    console.log(msgCarregando)
    return(
      <div className="container-fluid">
        <Jumbotron className="admin-jumbotron text-center">
          <h1>Usuários</h1>
        </Jumbotron>
        <Row>
          <Col xs={12}>
            {this.store.erro ? (<span id="erro">Erro: {this.store.erro}</span> ) : (
              <div>
                {msgCarregando}
                <UsuariosTable usuarios={this.store.usuarios} onCellClick={this.onCellClick.bind(this)} />
              </div>
            )}
          </Col>
        </Row>
      </div>
    )
  }
}

