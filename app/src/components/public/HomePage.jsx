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
                    console.log("aaaaaaa")
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
                    <a href="#"><img className="img-thumbnail" src={'/img/imoveis/' +this.store.imovelPrincipal.imagemPrincipal} alt="" class="img-responsive" /></a>
                    <h4 className="h4-center">{this.store.imovelPrincipal.website.subtitulo}</h4>

                    <p>{this.store.imovelPrincipal.website.descricao}</p>
                    <p><a className="btn btn-default" href="imovelVenda/index.html">Veja mais &raquo;</a></p>
                  </aside>
                      </div>
                      <div className="container">
                        {this.store.imoveisHomepage.map(i => (
                          <section className="col-md-3 col-sm-6">
                            <h2>{i.website.titulo}</h2>
                            <img className="img-thumbnail" src={'/img/imoveis/'+i.imagemPrincipal} alt="Foto inicial imóvel 1" className="img-responsive" /><br/>
                            <h4 className="h4-center">{i.website.subtituloWebsite}</h4>
                            <p className="text-center">{i.website.observacaoWebsite}</p>
                            <p><a className="btn btn-default" href="imovelVenda/index.html">Veja mais &raquo;</a></p>
                          </section>
                        ))}
                      </div>
                      <div className="row">

                        <div className="panel-group" id="accordion">
                          <div className="panel panel-primary">
                            <div className="panel-heading">
                              <section className="row footer">

                                <div className="hidden-xs">
                                  <div className="col-md-5 col-sm-5">
                                    <img src="img/tb_logo.png" width="180px" alt="Logo da Miria Flores" />
                                    <h6>Copyright© 2017 Todos os direitos reservados.</h6>
                                  </div>

                                  <div className="col-md-3 col-sm-2">
                                  </div>

                                  <div className="col-md-4 col-md-push-1 col-sm-3 col-sm-push-2">
                                    <center>
                                      <a href="#">
                                        <img src="img/facebook.png" alt="Logo do Facebook" />
                                      </a>
                                      <a href="#">
                                        <img src="img/instagram.png" alt="Logo do instagram" />
                                      </a>
                                      <div className="panel-title">
                                        <br />
                                        <a data-toggle="collapse" data-parent="#accordion" href="#footer">
                                        </a>
                                      </div>
                                    </center>
                                  </div>
                                </div>
                              </section>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  )
                  }
                  }
