import Input from '../../../utils/Input.jsx'
import PropTypes from 'prop-types'
import { Button, Col, Row, Alert } from 'react-bootstrap'
import React from 'react'
import validator from 'validator'
import { observer } from 'mobx-react'

export default class UsuariosForm extends React.Component {
  triggerBlur() {
    this.username.onBlur()
    this.email.onBlur()
    this.fullname.onBlur()

  }

  render() {
    const senhaInput = this.props.role == 'admin' ?
      (<Input label="Senha"
        value={this.props.user.password}
        onChange={e => this.props.onUserPropChange('password', e.target.value)}
        validationFunction={val => {
          if (!val)
            return false
          return true
        }}
        validationMessage="Campo não pode estar vazio"
      />) : null
    return (
    <Row> <Col xs={12}>
        <form onSubmit={this.props.onSubmit}>
          <Input 
            ref={(input) => { this.username = input }}
            label="Username"
            value={this.props.user.username}
            onChange={(e) => this.props.user.username != 'miria' ?
                this.props.onUserPropChange('username', e.target.value) : alert('Este nome de usuário não pode ser alterado')}
            validationFunction={(val) => {
              if(!val)
                return false

              return true
            }}
            validationMessage="Campo não pode estar vazio"
            disabled={this.props.role != 'admin'}

          />
          {senhaInput}
          <Input label="Nome Completo"

            ref={(input) => { this.fullname = input }}
            value={this.props.user.fullname}
            onChange={e => this.props.onUserPropChange('fullname', e.target.value)}
            validationFunction={(val) => {
              if(!val)
                return false

              return true
            }}
            validationMessage="Campo não pode estar vazio"
          />
          <Input label="Email"
            value={this.props.user.email}
            ref={(input) => { this.email = input }}
            onChange = {e => this.props.onUserPropChange('email', e.target.value)}
            validationFunction={(val) => {
              if(!val || !validator.isEmail(val))  
                return false

              return true
            }}
            validationMessage="Campo deve ser um email valido"
          />
          {this.props.alert.mensagem ? (
            <Alert bsStyle={this.props.alert.style} className="text-center">
              {this.props.alert.mensagem} </Alert>) :
              null}

              <Button type="submit" 
                className="save-button"
                bsStyle="primary"
              >Salvar</Button>
              {this.props.user._id && (this.props.user.username != 'miria') ?
              (<Button 
                className="delete-button"
                bsStyle="danger"
                onClick={this.props.onDelete}
              >Deletar</Button>) : null}

            </form>
          </Col>
        </Row>
)
  }
}

UsuariosForm.propTypes = {
  onSubmit: PropTypes.func,
  user: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
    fullname: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string
  }),
  onUserPropChange: PropTypes.func,
  alert: PropTypes.shape({
    style: PropTypes.string,
    mensagem: PropTypes.string
  }),
  onDelete: PropTypes.func
  
}


