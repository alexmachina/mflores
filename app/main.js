import PublicPage from './src/components/public/PublicPage.jsx'
import AdminPage from './src/components/admin/AdminPage.jsx'
import ImovelPage from './src/components/admin/imoveis/imovel/ImovelPage.jsx'
import ImoveisPage from './src/components/admin/imoveis/ImoveisPage.jsx'
import RelatoriosPage from './src/components/admin/relatorios/RelatoriosPage.jsx'
import RelatorioImoveisPage from './src/components/admin/relatorios/imoveis/RelatorioImoveisPage.jsx'
import RelatorioControlePage from './src/components/admin/relatorios/controle/RelatorioControlePage.jsx'
import RelatorioLocacaoPage from './src/components/admin/relatorios/locacao/RelatorioLocacaoPage.jsx'
import SistemaPage from './src/components/admin/sistema/SistemaPage.jsx'
import UsuariosPage from './src/components/admin/sistema/usuarios/UsuariosPage.jsx'
import HomePage from './src/components/public/HomePage.jsx'
import ContactPage from './src/components/public/ContactPage.jsx'
import EmpresaPage from './src/components/public/EmpresaPage.jsx'
import PublicImovelPage from './src/components/public/ImovelPage.jsx'
import PublicImoveisPage from './src/components/public/ImoveisPage.jsx'
import ReactDOM from 'react-dom'
import React from 'react'

import {Router, IndexRoute, Route, hashHistory, Link} from 'react-router';
const rt = (
  <Router history={hashHistory}>
    <Route path="/" component={PublicPage} >
      <IndexRoute component={HomePage} />
      <Route path="/contato" component={ContactPage} />
      <Route path="/empresa" component={EmpresaPage} />
      <Route path="/imoveis" component={PublicImoveisPage} />
      <Route path="/imovel/:id" component={PublicImovelPage} />
    </Route>
    <Route path="/admin" component={AdminPage} >
      <Route path="/admin/imoveis" component={ImoveisPage} />
      <Route path="/admin/imovel/:id" component={ImovelPage} />
      <Route path="/admin/relatorios" component={RelatoriosPage} />
      <Route path="/admin/relatorios/imoveis" component={RelatorioImoveisPage} />
      <Route path="/admin/relatorios/controle" component={RelatorioControlePage} />
      <Route path="/admin/relatorios/locacao" component={RelatorioLocacaoPage} />
      <Route path="/admin/sistema" component={SistemaPage} />
      <Route path="/admin/sistema/usuarios" component={UsuariosPage} />
      
    </Route>
    
  </Router>
)

ReactDOM.render(rt, document.getElementById('app'));
