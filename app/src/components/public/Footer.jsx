import React from 'react'

export default class Footer extends React.Component {
  render() {
    return(
      <div style={{marginTop:'60px'}} className="row">

        <div className="panel-group" id="accordion" style={{marginBottom:'0'}}>
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

                  <div className="col-md-3 col-md-push-1 col-sm-3">
                    <center>
                      <a href="https://www.facebook.com/Miria-Flores-Im%C3%B3veis-384618761925216">
                        <img src="img/facebook.png" alt="Logo do Facebook" />
                      </a>
                      <a href="https://www.instagram.com/miriafloresimoveis/">
                        <img src="img/instagram.png" alt="Logo do instagram" />
                      </a>
                      <a href="https://galpoesindustriais.blogspot.com">
                        <img src="img/blog.png" />
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
    )
  }
}


