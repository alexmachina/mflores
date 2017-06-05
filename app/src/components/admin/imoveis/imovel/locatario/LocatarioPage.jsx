import React from 'react'
import LocatarioForm from './LocatarioForm.jsx'
import ImovelHeader from '../../../geral/ImovelHeader.jsx'

export default class LocatarioPage extends React.Component {
  render() {
    return(
      <div>
        <ImovelHeader id={this.props.params.id} />
        <LocatarioForm id={this.props.params.id} />
      </div>
    )
  }
}
