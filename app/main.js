import PublicPage from './src/components/public/PublicPage.jsx'
import AdminPage from './src/components/admin/AdminPage.jsx'
import ImovelPage from './src/components/admin/imoveis/ImovelPage.jsx'
import ImoveisPage from './src/components/admin/imoveis/ImoveisPage.jsx'

import ReactDOM from 'react-dom'
import React from 'react'

import {Router, Route, hashHistory, Link} from 'react-router';
const rt = (
  <Router history={hashHistory}>
    <Route path="/" component={PublicPage} />
    <Route path="/admin" component={AdminPage} >
      <Route path="/admin/imoveis" component={ImoveisPage} />
      <Route path="/admin/imovel/:id" component={ImovelPage} />
      
    </Route>
  </Router>
)

ReactDOM.render(rt, document.getElementById('app'));
