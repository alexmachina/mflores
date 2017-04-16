  import React from 'react'
import './styles/cultura.css'
import './styles/estilo_total.css'

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
    </div>


      )
    }
  }
