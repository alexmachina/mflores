import React from 'react'
import ProprietarioStore from '../../../../stores/admin/proprietarioStore.js'
import ProprietariosForm from '../components/ProprietariosForm.jsx'
import {observer} from 'mobx-react'

@observer
export default class ProprietariosFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.store = new ProprietarioStore()
  }
  componentDidMount() {
    if(this.props.params.id)
      this.store.getProprietario(this.props.params.id)

  }
  render() {
    return (
      <ProprietariosForm 
        selectedProprietario={this.store.selectedProprietario}
        schema={this.store.schema}
        onChange={this.onChange.bind(this)}
        onSubmit={this.onSubmit.bind(this)}
        loaded={this.store.loaded}
        buttonText={this.store.buttonText}
        buttonStyle={this.store.buttonStyle}
        error_message={this.store.error_message}
        showDeleteModal={this.store.showDeleteModal}
        onDelete={() => this.store.showDeleteModal = true}
        onDeleteConfirm={this.onDeleteConfirm.bind(this)}
        onDeleteDeny={() => this.store.showDeleteModal = false}
        
      />
    )


  }

  onSubmit(e) {
    e.preventDefault()
    if (this.store.selectedProprietario._id) {
      this.store.updateProprietario()
    } else {
      console.log(this.store.selectedProprietario)
      this.store.addProprietario()
    }
  }

  onChange(key, childKey, value) {
    if (childKey) {
      this.store.selectedProprietario[key][childKey] = value
    } else {
      this.store.selectedProprietario[key] = value

    }
  }

  onDeleteConfirm() {
    this.store.deleteProprietario()
  }
  
}
