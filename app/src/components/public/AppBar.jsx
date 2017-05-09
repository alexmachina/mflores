  import React from 'react'
import './styles/cultura.css'
import './styles/estilo_total.css'
import './styles/appbar.scss'
import { Glyphicon } from 'react-bootstrap'

  export default class AppBar extends React.Component {
    render() {
      return(
        <div>
          <nav className="navbar navbar-fixed-top">
            <div className="container">
              <div className="row visible-sm visible-xs">
                <ul className="nav nav-pills col-md-12 menu">
                  <li className=""><a href="index.html">Miria Flores</a></li>
                  <li className="cor-menu-li pull-right"><a className="active" href="/#/" id="menu" data-toggle="dropdown"><span className="glyphicon glyphicon-align-justify"></span> MENU </a>
                    <ul className="dropdown-menu menu2 " role="menu" aria-labelledby="menu">
                      <li><a href="/#/imoveis"> Imoveis Disponiveis</a></li>
                      <li><a href="/#/empresa"> Empresa</a></li>
                      <li><a href="/#/contato"> Contato</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="navbar  hidden-xs hidden-sm">
                <ul className="nav nav-pills menu">
                  <li className="active"><a  href="/#/"> Início</a></li>
                  <li><a href="/#/imoveis"> Imoveis Disponiveis</a></li>
                  <li><a href="/#/empresa"> Empresa</a></li>
                  <li><a href="/#/contato"> Contato</a></li>
                </ul>
              </div>
            </div>
          </nav>
          <div>
            <div className="container">
              <header className="row cima">
                <header className="col-md-4">
                  <a href="index.html" title="atalho para a home">
                    <img  src="/img/tb_logo.png" width="320" alt="Logo Miria Flores" className="img-responsive pull-left img-home" />
                  </a>
                </header>
                <header className="col-md-6" id="card">
                  <h2>Miria Flores</h2>
                  <h4>
                    <p><Glyphicon glyph="earphone" />(11) 4159-2625</p>
                    <p><span className="celular"><Glyphicon glyph="phone" /> (11) 95639-9063</span>
                      <span className="celular"><Glyphicon glyph="phone" />(11) 7703-4683</span></p>
                  </h4>
                  <h4 id="creci">CRECI: 174374</h4>
                  <h3></h3>
                </header>
              </header>
            </div>
          </div>
        </div>


      )
    }
  }
