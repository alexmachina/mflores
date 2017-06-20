import React from 'react'
import {Button, Row, Col, Navbar, Nav, NavItem, MenuItem} from 'react-bootstrap'
import LoginStore from '../../stores/admin/loginStore.js'
import './styles/appBar.scss'

import DevTool, {configureDevTool} from 'mobx-react-devtools'
export default class AppBar extends React.Component {
  constructor(props) {
    super(props)
    this.store = new LoginStore()
  }
  render() {
    return(
      <div>
        <Row>
          <Col xs={12}>
            <Navbar id="navbar">
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="#">MFlores</a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                 
                  <NavItem eventKey={1} href="/#/admin/imoveis">Imoveis</NavItem>
                  <NavItem eventKey={2} href="/#/admin/proprietarios">Proprietários</NavItem>
                  <NavItem eventKey={3} href="/#/admin/relatorios">Relatorios</NavItem>
                  <NavItem eventKey={4} href="/#/admin/sistema">Sistema</NavItem>
                </Nav>
                <Nav pullRight>
                  <NavItem eventKey={2} href="#">
                    <span onClick={this.onLogoutClick.bind(this)}>
                      Logout</span>
                  </NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>

        <Row>
        </Row>
      </div>
    )
  }

  onLogoutClick() {
    this.store.logout()
  }
}
