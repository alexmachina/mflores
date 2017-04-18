import React from 'react'
import {Row, Col, Image} from 'react-bootstrap'
import "react-image-gallery/styles/css/image-gallery.css";
import { observer } from 'mobx-react'
import ImovelPageStore from '../../stores/public/imovelPageStore.js'
import ImageGallery from 'react-image-gallery'

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
      <header className="row cima">
        <header className="col-md-6">
          <a href="index.html" title="atalho para a home"><img  src="/img/tb_logo.png" width="320" alt="Logo Miria Flores" className="img-responsive pull-left img-home" /></a>
        </header>
      </header>

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
          <Col className="text-left">
            {this.store.imovel.precoVenda ?
                (
            <h3>Preço de venda:{this.formatToReal(this.store.imovel.precoVenda)}</h3>
                ) : <h3></h3>
            }

            {this.store.imovel.precoLocacao ? (
            <h3>Preço de Locação: {this.formatToReal(this.store.imovel.precoLocacao)}</h3>
            ) : <h3></h3>
            }
          </Col>
          <p>{this.store.imovel.website.descricao}</p>
        </Col>
      </Row>
    </div>
    )
}
formatToReal(valor) {
  if(valor)
    return 'R$'+ Intl.NumberFormat('pt-BR').format(valor).toString()
  else
    return ''
}


}
