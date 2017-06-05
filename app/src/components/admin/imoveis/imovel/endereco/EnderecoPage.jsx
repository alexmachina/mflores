import React from 'react'
import EnderecoForm from './EnderecoForm.jsx'
import ImovelHeader from '../../../geral/ImovelHeader.jsx'

export default class EnderecoPage extends React.Component {

  render() {
    return (
      <div>
        <ImovelHeader id={this.props.params.id} />
        <EnderecoForm id={this.props.params.id} />
      </div>

    )

  }
  }
