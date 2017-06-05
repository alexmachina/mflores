import React from 'react'
import {Row, Modal, Col, Button, Image} from 'react-bootstrap'
import ImagemFormStore from '../../../../../stores/admin/imagemFormStore.js'
import {observer} from 'mobx-react'
import Input from '../../../../utils/Input.jsx'


@observer
export default class ImagemForm extends React.Component {
  constructor(props) {
    super(props)
    this.store = new ImagemFormStore()
  }
  componentDidMount() {
    this.store.getImagens(this.props.id)
  }

    onMultipleChange(e) {
      this.store.saveImages(e.target.files, this.props.id)
  }

  render() {
    let deleteButton = null
    if(this.store.imagem._id) {
      deleteButton = <Button bsStyle="danger" onClick={() =>{ 
        this.store.deleteImagem(this.props.id)
      }}>Deletar</Button>

    }
    let loading = null
    if(this.store.loading)
      loading = <span>Carregando...</span>

    return (
      <div className="container-fluid">
        <Row>
          <Col className="text-center" xs={12} md={8} mdOffset={2}>
            <form onSubmit={this.onCapaFormSubmit.bind(this)}>
              <h3>Capa</h3>
              <Col xs={12} md={6}>
                <Image src={'/img/imoveis/'+this.store.capa} responsive/>
              </Col>
              <input type="file" style={{display:'inline'}} onChange={this.onCapaChange.bind(this)} />
              <Button type="submit">
                Enviar
              </Button>
            </form>
            </Col>

          </Row>
          <Row>
            <Col xs={12} md={8} mdOffset={2}>
              {this.store.error}
              <Col xs={12} md={6}>
              <Button onClick={() =>{ 
                this.store.showModal = true
                this.store.imagem = {}
              }}
              className="table-button"
              bsStyle="primary">
              Adicionar Imagem
            </Button>
      </Col>
      <Col xs={12} md={6}>
            <label>Inserir multiplas imagens</label>
            <input 
               type="file"
               name="arquivos"
               onChange={this.onMultipleChange.bind(this)}
               multiple />
      {loading}
      </Col>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={8} mdOffset={2}>
            {this.store.imagens.map(i => (
              <Col  key={i._id} className="image-block" xs={12} sm={6} md={4} >
                <Image src={'/img/imoveis/'+i.arquivo} responsive onClick={() => {
                  this.store.showModal = true
                  this.store.imagem = i
                }}/>
            </Col>
            ))}
          </Col>
        </Row>

        <Modal show={this.store.showModal} onHide={() => this.store.showModal = false}>
          <Modal.Header closeButton>
            <Modal.Title>Nova Imagem</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <label>Imagem</label>
            <form onSubmit={this.onSubmit.bind(this)}>
              <input type="file" 
                onChange={this.onImagensChange.bind(this)}
                name="Imagens"
              />
              <Input label="Titulo"
                value={this.store.imagem.titulo}
                onChange={this.onTituloChange.bind(this)}
              />
              <Input label="Descrição"
                value={this.store.imagem.descricao}
                onChange={this.onDescricaoChange.bind(this)}
              />
              <Button type="submit" className="save-button">
                Salvar
              </Button>

            </form>

          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => this.store.showModal = false}>Cancelar</Button>
            {deleteButton}
          </Modal.Footer>

        </Modal>

      </div>
      )
      }
      onSubmit(e) {
        e.preventDefault()
        this.store.saveImagem(this.props.id)
      }
      onTituloChange(e){
        this.store.imagem.titulo = e.target.value
      }
      onDescricaoChange(e) {
        this.store.imagem.descricao = e.target.value
      }

      onImagensChange(e) {
        this.store.imagem.arquivo = e.target.files[0]
      }

      onCapaChange(e) {
        this.store.capa = e.target.files[0]
      }

      onCapaFormSubmit(e) {
        e.preventDefault()
        this.store.submitCapa(this.props.id)
      }
      onImageClick(e) {

      }
      }
