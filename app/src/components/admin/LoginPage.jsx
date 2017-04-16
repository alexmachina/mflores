import React from 'react'
import {Image, Button, Col, Row, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
import LoginStore from '../../stores/admin/loginStore.js'
import {observer} from 'mobx-react'
import './styles/login.scss'

@observer
export default class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.store = new LoginStore()
  }
  render() {
    return (
      <div className="container-fluid">
        <Row>
          <Col xs={12} md={3} mdOffset={4} id="login-form-container">
            <Image src="/img/tb_logo.png" responsive />
            <form onSubmit={this.onSubmit.bind(this)}>
              <FormGroup>
                <ControlLabel>Usuário</ControlLabel>
                <FormControl type="text" placeholder="Usuário" 
                  onChange={this.onUsernameChange.bind(this)}
                  value={LoginStore.username}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Senha</ControlLabel>
                <FormControl type="password" placeholder="Senha"
                  onChange={this.onPasswordChange.bind(this)}
                  value={LoginStore.password}
                />
              </FormGroup>
              <Button id="submit-button" type="submit" bsStyle="primary" bsSize="lg">
                Entrar
              </Button>
                {this.store.message}
            </form>
          </Col>
        </Row>
      </div>
    )
  }

  onSubmit(e) {
    e.preventDefault();
    this.store.login()
  }

  onUsernameChange(e) {
    this.store.username = e.target.value
  }

  onPasswordChange(e) {
    this.store.password = e.target.value
  }


}
