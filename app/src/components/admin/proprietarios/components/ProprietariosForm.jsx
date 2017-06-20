import React from 'react'
import { Row, Col, Button, Jumbotron } from 'react-bootstrap'
import Input from '../../../utils/Input.jsx'
import { observer } from 'mobx-react'
import { Link } from 'react-router'
import Loader from 'react-loader'
import ConfirmationModal from '../../geral/ConfirmationModal.jsx'

@observer
export default class ProprietariosForm extends React.Component {
  render() {
    let component = null
    let arrComponents = []
    let schema = this.props.schema

    Object.keys(schema).forEach(key => {
      if (schema[key].type == 'schema') {
        let object = schema[key]
        Object.keys(object).forEach(childKey => {
          if(typeof object[childKey] == 'object') {
            arrComponents.push(
              <Input
                key={`${key}.${childKey}`}
                value={this.props.selectedProprietario[key][childKey]}
                label={object[childKey].label}
                onChange={(e) => { this.props.onChange(key, childKey, e.target.value) }}
              />
            )
          }
        })       
      } else {
        arrComponents.push(
          <Input
            key={key}
            value={this.props.selectedProprietario[key]}
            label={schema[key].label}
            onChange={(e) => { this.props.onChange(key, null, e.target.value) }}
          />)
      }
    })

    return (
      <div className="container-fluid">
        <Jumbotron className="admin-jumbotron text-center">
          <h1>
            {this.props.selectedProprietario._id
              ? this.props.selectedProprietario.nome : 'Novo Proprietário'}
            </h1>
        </Jumbotron>
        <div className="container">
        {arrComponents}
        <Button onClick={this.props.onSubmit} bsStyle="primary" style={this.props.buttonStyle} className="form-control" onSubmit={this.props.onSubmit}>
          {this.props.buttonText}
        </Button>
        <br />
        <br />
        <Link to="/admin/proprietarios">
          <Button className="form-control">
            Voltar
          </Button>
        </Link>
        <br />
        <br />
        <Button className="form-control" onClick={this.props.onDelete} bsStyle="danger">
          Deletar
        </Button>
        <ConfirmationModal 
          header="Sistema"
          question="Confirmar deleção de Proprietário?"
          show={this.props.showDeleteModal}
          onConfirm={this.props.onDeleteConfirm}
          onDeny={this.props.onDeleteDeny}
        />

        <Loader loaded={this.props.loaded} />
        {this.props.error_message}

      </div>

    </div>
  )

  }
}

