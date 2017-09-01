import React from 'react'
import { Row, Col, Button, Jumbotron } from 'react-bootstrap'
import Input from '../../../utils/Input.jsx'
import Select from '../../../utils/Select.jsx'
import { observer } from 'mobx-react'
import { Link } from 'react-router'
import Loader from 'react-loader'
import ConfirmationModal from '../../geral/ConfirmationModal.jsx'

@observer
export default class ProprietariosForm extends React.Component {
    render() {
        let component = null
        let arrComponents = []
        let setProp = this.props.setProp
        let proprietario = this.props.selectedProprietario
        let endereco = proprietario.endereco
        let estados = this.props.estados
        let cidades = this.props.cidades
        let getCidades = this.props.getCidades
        let setEndProp = this.props.setEndProp

        return (
            <div className="container-fluid">
              <Jumbotron className="admin-jumbotron text-center">
                <h1>
                  {this.props.selectedProprietario._id
                  ? this.props.selectedProprietario.nome : 'Novo Proprietário'}
                </h1>
              </Jumbotron>
              <div className="container">
                  <Input
                      label="CPF/CNPJ"
                      onChange={(e) => setProp('cpfCnpj', e.target.value)}
                      value={proprietario.cpfCnpj}
                  />
                  <Input
                      label="RG/Inscrição"
                      onChange={(e) => setProp('rgInscricao',e.target.value)}
                      value={proprietario.rgInscricao}
                  />
                  <Input
                      label="Nome"
                      onChange={(e) => setProp('nome', e.target.value)}
                      value={proprietario.nome}
                  />
                  <Input
                      label="telefone"
                      onChange={(e) => setProp('telefone', e.target.value)}
                      value={proprietario.telefone}
                  />
                  <Input
                      label="celular"
                      onChange={(e) => setProp('celular', e.target.value)}
                      value={proprietario.celular}
                  />
                  <Input
                      label="email"
                      onChange={(e) => setProp('email', e.target.value)}
                  />
                  <Select
                      label="Estado"
                      value={endereco.estado}
                      onChange={(e) =>{
                              setEndProp('estado', e.target.value)
                              getCidades(e.target.value)
                      }}

                      options={estados}
                 />
                  <Select
                      label="Cidade"
                      value={endereco.cidade}
                      options={cidades}
                      onChange={(e) => setEndProp('cidade', e.target.value)}

                  />
                  <Input
                      label="CEP"
                      onChange={(e) => setEndProp('cep', e.target.value)}
                  />
                  <Input
                      label="Rua"
                      onChange={(e) => setEndProp('rua', e.target.value)}
                      value={endereco.rua}
                  />
                  <Input
                      label="Numero"
                      onChange={(e) => setEndProp('numero', e.target.value)}
                      value={endereco.numero}
                  />
                  <Input
                      label="Bairro"
                      onChange={(e) => setEndProp('bairro', e.target.value)}
                      value={endereco.bairro}
                  />
                  <Input
                      label="Complemento"
                      onChange={(e) => setEndProp('complemento', e.target.value)}
                      value={endereco.complemento}
                  />
                  <Input
                      label="Ponto de Referencia"
                      onChange={(e) => setEndProp('pontoDeReferencia', e.target.value)}
                  />

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
