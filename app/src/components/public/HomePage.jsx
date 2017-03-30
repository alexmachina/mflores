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
    this.store.getImoveis()
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
                  {this.store.imoveis.map((imovel, i) => {
                    let active = 'item'
                    if(i == 0){ 
                      active = 'item active'
                    }
                    return(
                      <div className={active}>
                        <img src={'/img/imoveis/'+imovel.imagemPrincipal} />
                          <div className="carousel-caption">
                            <p>{imovel.titulo}</p>
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
                    <h2 >CHÁCARA PAISAGEM</h2>
                    <a href="#"><img className="img-thumbnail" src="img/tres.jpg" alt="" class="img-responsive" /></a>
                    <h4 className="h4-center"> Linda Chácara para Locação ou venda</h4>

                    <p>Rua Gallo da Serra   , 1065 - das Lages - Próximo ao Condomínio Paisagem -
                      3,5 k da Raposo Tavares

                      03 dormitórios - sendo 01 suíte
                      03 banheiros internos
                      cozinha completa
                      sala de jantar
                      sala de estar com lareira
                      área de churrasqueira com forno de pizza
                      geladeira
                      fogão a lenha
                      mesa de sinuca
                      mesa de pebolim
                      piscina adulto e infantil
                      banheiros área externa
                      quadra de volei de areia
                      campo de futebol
                      caseiro 24 horas</p>
                    <p><a className="btn btn-default" href="imovelVenda/index.html">Veja mais &raquo;</a></p>
                  </aside>
                      </div>
                      <div className="container">
                        {this.store.imoveis.map(i => (
                          <section className="col-md-3 col-sm-6">
                            <h2>{i.titulo}</h2>
                            <img className="img-thumbnail" src={'/img/imoveis/'+i.imagemPrincipal} alt="Foto inicial imóvel 1" className="img-responsive" /><br/>
                            <h4 className="h4-center">{i.subtituloWebsite}</h4>
                            <p className="text-center">{i.observacaoWebsite}</p>
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
