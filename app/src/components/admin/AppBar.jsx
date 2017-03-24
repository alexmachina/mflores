import React from 'react'
import {Button, Row, Col, Navbar, Nav, NavItem, MenuItem} from 'react-bootstrap'
import LoginStore from '../../stores/admin/loginStore.js'

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
            <Navbar>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="#">MFlores</a>
                </Navbar.Brand>
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  <NavItem eventKey={1} href="/#/admin/imoveis">Imoveis</NavItem>
                </Nav>
                <Nav pullRight>
                  <NavItem eventKey={2} href="#">
                    <Button onClick={this.onLogoutClick.bind(this)}>Logout
                    </Button>
                  </NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>

        <Row>
          <DevTool />
        </Row>
      </div>
    )
  }

  onLogoutClick() {
    this.store.logout()
  }
}
