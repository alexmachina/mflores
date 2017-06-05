import React from 'react'
import WebsiteForm from './WebsiteForm.jsx'
import ImovelHeader from '../../../geral/ImovelHeader.jsx'

export default class WebsitePage extends React.Component {
  render() {
    return(
      <div>
        <ImovelHeader id={this.props.params.id} />
      <WebsiteForm id={this.props.params.id} />
    </div>
    )
  }
}
