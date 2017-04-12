import React from 'react'
import {Pagination, Row, Col, Image, Button} from 'react-bootstrap'
import Input from '../utils/Input.jsx'
import SearchField from '../utils/SearchField.jsx'
import ImoveisPageStore from '../../stores/public/imoveisPageStore.js'
import { observer } from 'mobx-react'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css';

@observer
export default class ImoveisPage extends React.Component {
  constructor(props) {
    super(props)
    this.store = new ImoveisPageStore()
    
  }
  componentDidMount() {
    this.store.getImoveis()
  }
  render() {
    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const Range = createSliderWithTooltip(Slider.Range);
    return (
      <div className="container">
        <Row>
          <Col className="search-bar text-center" xs={12} md={12}>
            <Col xs={12} md={6}>
              <span>Faixa de Preço de Venda</span>
              <Range
                step={5000}
                min={5000}
                max={1000000}
                defaultValue={this.store.precoVendaRange}
                onChange={this.onPrecoVendaRangeChange.bind(this)}
                style={{marginBottom: '20px'}}
              />
            </Col>
            <Col xs={12} md={6}>
              <span>Faixaa de Preço de Locação</span>
                <Range
                  step={100}
                  min={100}
                  max={100000}
                  defaultValue={this.store.precoLocacaoRange}
                  onChange={this.onPrecoLocacaoRangeChange.bind(this)}
                  style={{marginBottom: '20px'}}
                />
            </Col>
          </Col>
        </Row>
        <Row>
          <Col className="imoveis">
            <Row>
            {this.store.imoveis.map(i => (
            <Col xs={12} md={4}>
              <Image src={'/img/imoveis/'+i.imagemPrincipal} responsive/>
              <h3>{i.website.titulo}</h3>
              <h4>{i.website.subtitulo}</h4>

            </Col>
            ))}
          </Row>
          <Row>
            <Col xs={12}>
            <Pagination
              activePage={this.store.activePage}
              items={this.store.items}
              onSelect={(e) => {
                this.store.activePage = e
                this.store.getImoveis()
              }}
            />
          </Col>
          </Row>

        </Col>
      </Row>
    </div>
    )
  }

  onSearchChange(e) {
    this.store.search = e.target.value
  }

  onPrecoVendaRangeChange(e) {
    this.store.precoVendaRange = e
  }

  onPrecoLocacaoRangeChange(e) {
      this.store.precoLocacaoRange = e
  }
}
