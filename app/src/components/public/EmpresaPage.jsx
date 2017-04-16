import React from 'react'
import GoogleMapReact from 'google-map-react'
import {Image} from 'react-bootstrap'

export default class EmpresaPage extends React.Component {
  render() {
    let defaultProps = {
      center: {lat:-23.6039054, lng:-47.0241479},
      zoom: 18
    };

    let api_key = 'AIzaSyB15_zdGasATMD42y_x5uuqDvxiDjmB22g'

    return (
      <div className="container">
      <header className="row cima">
        <header className="col-md-12">
          <a href="index.html" title="atalho para a home"><img  src="/img/tb_logo.png" width="320" alt="Logo Miria Flores" className="img-responsive pull-left img-home" /></a>
        </header>
      </header>

      <div className="row">
        <div>
          <article className="col-md-12">

            <div className="col-md-7">
              <h1 className="tituloh1">Sobre a empresa:</h1>
              <p className="estilo">Atuando desde 2010 no mercado imobiliário, busco sempre oferecer serviços diferenciados. Meu trabalho é pautado na honestidade, primando satisfazer os objetivos e solicitações dos mais variados, desta forma tenho conquistado vários clientes, abrindo novas oportunidades de crescimento e expansão.</p>
              <p className="estilo">Atuo em todos os segmentos deste mercado:  compra, venda, locação e administração, visando sempre atualizar-me para atender com agilidade esse mercado tão dinâmico e diversificado, tenho como parceiro um departamento jurídico de qualidade que preza sempre garantir a satisfação dos clientes.</p>
              <p className="estilo">Compõe minha matéria-prima de trabalho galpões comerciais e industriais, escritórios, salões e casas comerciais, terrenos e imóveis residenciais, padrão e de alto padrão, como mansões, casas, coberturas e apartamentos, além de chácaras e sítios, oportunizando desta forma, atender as mais diversas exigências dos clientes.
              </p>


            </div>

      <div 
      style={{height: '350px'}}
      className="col-md-5">
      <GoogleMapReact 
      bootstrapURLKeys={{
        key: api_key
      }}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
      >
      <Image src="/img/marker.svg" 
      lat={defaultProps.center.lat}
      lng={defaultProps.center.lng} />
      </GoogleMapReact>

      </div>

      </article>
    </div>

  </div>
</div>
)
}
}


