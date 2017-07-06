import React from 'react'
import {Row, Col, Image} from 'react-bootstrap'
import "react-image-gallery/styles/css/image-gallery.css";
import { observer } from 'mobx-react'
import ImovelPageStore from '../../stores/public/imovelPageStore.js'
import ImageGallery from 'react-image-gallery'
import formatToReal from '../utils/formatToReal.js'

@observer
export default class ImovelPage extends React.Component {
  constructor(props) {
    super(props)
    this.store = new ImovelPageStore()
  }

  componentDidMount() {
    this.store.getImovel(this.props.params.id)
  }

  render() {
    let endereco = this.store.imovel.endereco
    let images = []
    images.push({
      original: `/img/imoveis/${this.store.imovel.imagemPrincipal}`,
      thumbnail: `/img/imoveis/${this.store.imovel.imagemPrincipal}`
    })

    this.store.imovel.imagens.forEach(imagem => {
      images.push({
        original: `/img/imoveis/${imagem.arquivo}`,
        thumbnail: `/img/imoveis/${imagem.arquivo}`
      })
    })
    return (
      <div className="container">
     
      <Row>
        <Col xs={12} md={6}>
          <h1>{this.store.imovel.website.titulo}</h1>
          <ImageGallery 
            items={images}
            slideInterval={2000}
          />
        </Col>
        <Col xs={12} md={6} className="text-center">
          <h1 style={{color:'#c8002d'}}>{this.store.imovel.website.subtitulo}</h1>

            <p>{this.store.imovel.website.descricao}</p>
          <Col className="text-left">
            <h3>Endereço</h3>
            <p>Cidade: {endereco.cidade.nome}</p>
            <p>Bairro: {endereco.bairro}</p>
            <p>Rua: {endereco.rua}</p>
            <p>Numero: {endereco.numero}</p>
            <p>Complemento : {endereco.complemento}</p>
            <p>Ponto de Referência: {endereco.pontoDeReferencia}</p>

            </Col>
            <Col className="text-left">
              {this.store.imovel.valorAnualIPTU || this.store.imovel.valorParceladoIPTU ? <h3>IPTU</h3> : <h3></h3>}
              {this.store.imovel.valorAnualIPTU ? (<p>Valor anual do IPTU: {formatToReal(this.store.imovel.valorAnualIPTU)}</p>) : <p></p>}
              {this.store.imovel.valorParceladoIPTU ? (<p>Valor parcelado do IPTU: {this.store.imovel.valorParceladoIPTU}</p>) : <p></p>}
            </Col>
            <Col className="text-left">
              {this.store.imovel.precoVenda ?
                  (
                    <h3>Preço de venda:{formatToReal(this.store.imovel.precoVenda)}</h3>
                  ) : <h3></h3>
              }

              {this.store.imovel.precoLocacao ? (
                <h3>Preço de Locação: {formatToReal(this.store.imovel.precoLocacao)}</h3>
              ) : <h3></h3>
              }
            </Col>
          </Col>
        </Row>
      </div>
      )
      }
      

      }
