import { observable, toJS, action } from 'mobx'
import { getJson } from '../../fetch.js'
import config from '../../config.js'
import pdfmake from 'pdfmake/build/pdfmake.min.js'
import vfs_fonts from 'pdfmake/build/vfs_fonts.js'
import moment from 'moment'
import formatToReal from '../../../components/utils/formatToReal.js'

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

  getDespesas(id) {
    return new Promise((resolve, reject) => {
      getJson(config.url+'/imovel/'+id+'/despesas').then(despesas => {
        let despesasArr = []
        despesasArr.push(['Descrição', 'Valor','Data'])
        despesas.forEach(d => {
          despesasArr.push([d.descricao, formatToReal(d.valor), moment(d.data).format('DD/MM/YYYY')])
        })

        resolve(despesasArr)
      })
    })
  }

  getReceitas(id) {
    return new Promise((resolve, reject) => {
      getJson(config.url+'/imovel/'+id+'/receitas').then(receitas => {
        let receitasArr = []
        receitasArr.push(['Descrição', 'Valor', 'Data', 'Observação'])
        receitas.forEach(r => {
          receitasArr.push([r.descricao, formatToReal(r.valor), moment(r.data).format('DD/MM/YYYY'), r.observacao])
        })

        resolve(receitasArr)

      })

    })
  }

  getSomaReceitas(id) {
    return new Promise((resolve, reject) => {
    })
  }
  toDataUrl(src, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      var canvas = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      var dataURL;
      canvas.height = this.height;
      canvas.width = this.width;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
    };
    img.src = src;
    if (img.complete || img.complete === undefined) {
      img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      img.src = src;
    }
  }
  @action generatePdf(id) {

    getJson(config.url + '/imovel/' + id).then(imovel => {
      this.toDataUrl(config.url + '/img/tb_logo.png', (base64Img) => {

        const getDespesas = this.getDespesas(imovel._id),
          getReceitas = this.getReceitas(imovel._id),
          operations = [getDespesas, getReceitas]

        Promise.all(operations).then(results => {
          let [despesas, receitas] = results

        var docDefinition = {
          pageMargins:[0,150,0,150],
          header: [

            { image: base64Img,
              width:150 ,
              height:75,
              alignment:'left',
              margin: [50, 50, 0, 0]
            }

          ],
          footer: [
            {
              columns: [
                [
                  {style: 'footerText',text: 'Telefones: 11 7703-4683/ 11 41592624/ 11 95639 9063 \n'+
                    'Rua Professor Valdecir Campestre, 364, Sala 01 \n'+
                    'Centro, Vargem Grande Paulista'},
                  {alignment: 'center', text:'www.mfloresimoveis.com.br | creci: 174374'}
                ],
                { image: base64Img,
                  width:200 ,
                  height:150,
                  alignment:'left',
                }
              ]
            }],
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
                  ['Observação: ', imovel.website.descricao],
                  ['IPTU: ', imovel.IPTU + '/Anual: ' + formatToReal(imovel.valorAnualIPTU) 
                    + '/Parcelado: '+ imovel.valorParceladoIPTU],
                  ['RGI: ', imovel.rgi],
                  ['Energia: ', imovel.energia],
                  ['Capacidade instalada: ', imovel.metragem.capacidade]

                ]
              }
            },

            {style:'informacoes', text: 'Despesas', },
            {table: {
              body: despesas

            }, style:'table'},
            {style:'informacoes', text:'Receitas'},
            { style:'table',
              table: {
                body:receitas
              }}
          ],
          styles:{
            footerText: {
              alignment:'center',
              color:'#3062b2',
              margin:[0,90,0,0]
            },
            header: {
              fontSize:12,
              bold:true,
              alignment: 'center'
            },
            table: {
              marginRight:50,
              marginLeft:50
            },
            tablePrincipal: {
              margin:[50,15,50,30]
            },
            informacoes: {
              fontSize:14,
              margin:[50,15,0,15]
            },
            subtitulo:
            {
              fontSize:12,
              bold:true,
              margin:5,
              alignment:'center'
            },
            default: {
              alignment: 'center'
            },
            marginTop: {
              marginTop:200
            }
          }
        }
          pdfMake.createPdf(docDefinition).open()
        })
      })
    })
  }
}
