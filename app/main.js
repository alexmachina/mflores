import PublicPage from './src/components/public/PublicPage.jsx'
import AdminPage from './src/components/admin/AdminPage.jsx'
import ImovelPage from './src/components/admin/imoveis/ImovelPage.jsx'
import ImoveisPage from './src/components/admin/imoveis/ImoveisPage.jsx'
import RelatoriosPage from './src/components/admin/relatorios/RelatoriosPage.jsx'
import RelatorioImoveisPage from './src/components/admin/relatorios/RelatorioImoveisPage.jsx'
import RelatorioImovelPage from './src/components/admin/relatorios/RelatorioImovelPage.jsx'
import HomePage from './src/components/public/HomePage.jsx'
import ContactPage from './src/components/public/ContactPage.jsx'
import EmpresaPage from './src/components/public/EmpresaPage.jsx'
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
    </Route>
    <Route path="/admin" component={AdminPage} >
      <Route path="/admin/imoveis" component={ImoveisPage} />
      <Route path="/admin/imovel/:id" component={ImovelPage} />
      <Route path="/admin/relatorios" component={RelatoriosPage} />
      <Route path="/admin/relatorios/imoveis" component={RelatorioImoveisPage} />
      
    </Route>
    <Route path="/relatorios/imovel/:id" component={RelatorioImovelPage} />
    
  </Router>
)

ReactDOM.render(rt, document.getElementById('app'));
