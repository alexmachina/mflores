import React from 'react'
import HomePageStore from '../../stores/public/homePageStore.js'
import { observer } from 'mobx-react'

@observer
export default class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.store = new HomePageStore()
  }
  componentDidMount() {
    this.store.getImoveisCarrossel()
    this.store.getImoveisHomepage()
    this.store.getImovelPrincipal()

  }
  render() {
    return (
      <div>
        <div>
          <div className="container">
            <header className="row cima">
              <header className="col-md-12">
                <a href="/#/" title="atalho para a home"><img  src="/img/tb_logo.png" width="320" alt="Logo Miria Flores" className="img-responsive pull-left img-home" /></a>
              </header>
            </header>

            <section className="col-md-8  col-sm-8">
              <h2 className="h2-dstq">DESTAQUES <span>&raquo;</span></h2>

              <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                  <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
                  <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                  <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                  {this.store.imoveisCarrossel.map((imovel, i) => {
                    let active = 'item'
                    if(i == 0){ 
                      active = 'item active'
                    }
                    return(
                      <div className={active}>
                        <img src={'/img/imoveis/'+imovel.imagemPrincipal} />
                        <div className="carousel-caption">
                          <p>{imovel.website.titulo}</p>
                          <a className="btn btn-large btn-primary" href="#">Veja mais >></a>
                        </div>
                      </div> )
                  })}
                </div>

                <a className="left carousel-control" href="#carousel-example-generic" data-slide="prev">
                  <span className="glyphicon glyphicon-chevron-left"></span>
                </a>
                <a className="right carousel-control" href="#carousel-example-generic" data-slide="next">
                  <span className="glyphicon glyphicon-chevron-right"></span>
                </a>
              </div>


            </section>
            <aside className="col-md-4 col-sm-4">
              <h2>{this.store.imovelPrincipal.website.titulo}</h2>
              <a href="#"><img className="img-thumbnail" src={'/img/imoveis/thumbnails/' +this.store.imovelPrincipal.imagemPrincipal} alt="" class="img-responsive" /></a>
              <h4 className="h4-center">{this.store.imovelPrincipal.website.subtitulo}</h4>

              <p>{this.store.imovelPrincipal.website.descricao}</p>
              <p><a className="btn btn-default" href={'/#/imovel/'+this.store.imovelPrincipal._id}>Veja mais &raquo;</a></p>
            </aside>
          </div>
          <div className="container">
            {this.store.imoveisHomepage.map(i => (
              <section className="col-md-3 col-sm-6">
                <h2>{i.website.titulo}</h2>
                <img className="img-thumbnail" src={'/img/imoveis/thumbnails/'+i.imagemPrincipal} alt="Foto inicial imóvel 1" className="img-responsive" /><br/>
                <h4 className="h4-center">{i.website.subtitulo}</h4>
                <p className="text-center">{i.website.observacao}</p>
                {i.precoVenda ? (
                <p>Preço de venda: {this.formatToReal(i.precoVenda)}</p>
                ) : <p></p> }
                {i.precoLocacao ? (
                <p>Preço de locação: {this.formatToReal(i.precoLocacao)}</p>
                ) : <p></p>}
                <p>{i.website.descricao}</p>
                <p><a className="btn btn-default" href={'/#/imovel/'+i._id}>Veja mais &raquo;</a></p>
              </section>
            ))}
          </div>
      </div>
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
