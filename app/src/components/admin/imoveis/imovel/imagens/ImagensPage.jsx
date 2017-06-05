import React from 'react'
import ImagensForm from './ImagensForm.jsx'
import ImovelHeader from '../../../geral/ImovelHeader.jsx'

export default class ImagensPage extends React.Component {
  render() {
    return(

    <div>
      <ImovelHeader id={this.props.params.id} />
      <ImagensForm id={this.props.params.id} />
    </div>

  )
}
}

