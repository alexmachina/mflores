import React from 'react'
import ProprietarioForm from './ProprietarioForm.jsx'
import ImovelHeader from '../../../geral/ImovelHeader.jsx'


export default class ProprietarioPage extends React.Component {
  render() {
    return(
      <div>
        <ImovelHeader id={this.props.params.id} />
      <ProprietarioForm id={this.props.params.id} />
    </div>
    )
  }
}
