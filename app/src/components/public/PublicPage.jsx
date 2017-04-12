import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, Link} from 'react-router';
import AppBar from './AppBar.jsx'
import Footer from './Footer.jsx'

export default class PublicPage extends React.Component {
  render() {
    return (
      <div>
        <AppBar />
        {this.props.children}
        <Footer />
          </div>
    )
  }
}

