import { observable, toJS, action } from 'mobx'
import { getJson } from '../../../fetch.js'
import config from '../../../config.js'
import pdfmake from 'pdfmake/build/pdfmake.min.js'
import vfs_fonts from 'pdfmake/build/vfs_fonts.js'
import moment from 'moment'
import formatToReal from '../../../../components/utils/formatToReal.js'
import {renderFooter, renderHeader, styles } from '../functions.js'

export default class RelatorioImovelStore {
  @observable imovel = {
    endereco: {},
    proprietario: {
      endereco: {}
    }
  }

  @action getImovel(id) {
    let url = config.url + '/imovel/' + id
    getJson(url).then(imovel => this.imovel = imovel)

  }

@action generatePdf(id) {

  const getImoveis = getJson(`${config.url}/imovel/${id}`)
  const operations = [getImoveis, renderHeader(), renderFooter()]

  Promise.all(operations).then(results => {
    const [imovel, header, footer] = results

        var docDefinition = {
          pageMargins:[0,150,0,130],
          header: header,
          footer: footer,
          content: [
            { 
              style:'table',
              margin:[50,0,50,15],
              table: {
                widths:['auto','*'],
                body: [
                  ['Proprietario:', imovel.proprietario.nome]
                ]
              }
            },


            {
              style:'table',
              table: {
                widths: ['auto','*'],
                body: [
                  ['Disponivel:', imovel.website.disponivel ? 'Sim': 'Não'],
                  ['Titulo:', imovel.website.titulo]
                ]
              }
            },

            { 
              style: 'informacoes',
              text: 'Informações do Imóvel:'},
            {
              style:'tablePrincipal',
              table:{
                widths:['auto','*'],
                body: [
                  ['Endereço:', imovel.endereco.rua],
                  ['Número: ', imovel.endereco.numero],
                  ['Cidade: ', imovel.endereco.cidade],
                  ['Referência: ', imovel.endereco.pontoDeReferencia],
                  ['CEP: ', imovel.endereco.cep],
                  ['Venda: ', formatToReal(imovel.precoVenda)],
                  ['Locação: ', formatToReal(imovel.precoLocacao)],
                  ['Condomínio: ', formatToReal(imovel.valorCondominio)],
                  ['Área Total: ', imovel.metragem.areaTotal],
                  ['Área Construída: ', imovel.metragem.areaConstruida],
                  ['Observação: ',{ text: imovel.website.descricao, fontSize:10}],
                  ['IPTU: ', imovel.IPTU + '/Anual: ' + formatToReal(imovel.valorAnualIPTU) 
                    + '/Parcelado: '+ imovel.valorParceladoIPTU],
                  ['RGI: ', imovel.rgi],
                  ['Energia: ', imovel.energia],
                  ['Capacidade instalada: ', imovel.metragem.capacidade]
                ]
              }
            },
          ],
          styles
                      
        }
        pdfMake.createPdf(docDefinition).open()
  })
  }
}
