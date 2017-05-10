import React from 'react'
import Cookies from 'js-cookie'
import LoginPage from './LoginPage.jsx'
import AppBar from './AppBar.jsx'

export default class AdminPage  extends React.Component{
  render() {
    let ren = (
      <div>
        <AppBar />
        {this.props.children}
      </div>)

    if(!Cookies.get('token')) {
      ren = <LoginPage />
    }
    return (
      <div>
        {ren}
      </div>
    )
  }
}
