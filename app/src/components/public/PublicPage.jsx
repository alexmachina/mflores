import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, Link} from 'react-router';
import AppBar from './AppBar.jsx'

export default class PublicPage extends React.Component {
  render() {
    return (
      <div>
        <AppBar />
        {this.props.children}
      </div>
    )
  }
}

