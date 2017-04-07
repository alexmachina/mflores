import { observable, toJS, action } from 'mobx'
import { getJson } from '../../fetch.js'
import config from '../../config.js'
import pdfmake from 'pdfmake/build/pdfmake.min.js'
import vfs_fonts from 'pdfmake/build/vfs_fonts.js'
import moment from 'moment'

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
          despesasArr.push([d.descricao, d.valor, moment(d.data).format('DD/MM/YYYY')])
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
          receitasArr.push([r.descricao, r.valor, moment(r.data).format('DD/MM/YYYY'), r.observacao])
        })

        resolve(receitasArr)
      
      })
      
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
      this.toDataUrl('http://localhost:3000/img/tb_logo.png', (base64Img) => {
        

      this.getDespesas(imovel._id).then(despesas => {
        this.getReceitas(imovel._id).then(receitas => {
        var docDefinition = {
          header: [
            
          ],
          content: [
            {image: base64Img,
              width:200,
              height:200,
              alignment:'center',
              margin:[0, 0, 0, 25]
            },
            {text: imovel.titulo, style: 'header'},
            {style:'default', text: 'Tipo:' + imovel.tipo},
            {style:'default', text: 'RGI: ' + imovel.rgi},
            {style:'default', text: 'Instalação: ' + imovel.instalacao},
            {style:'default', text: 'Observação: ' + imovel.observacaoGestor},
            {style:'default', text: 'Zoneamento: ' + (imovel.zoneamento ? 'Sim':'Não')},
            {style:'default', text: 'Metragem', style: 'subtitulo'},
            {style:'default', text: 'Area total: ' + imovel.metragem.areaTotal},
            {style:'default', text: 'Area construida: ' + imovel.metragem.areaConstruida},
            {style:'default', text: 'Capacidade: ' + imovel.metragem.capacidade},
            {style:'default', text: 'Endereço ', style:'subtitulo'},
            {style:'default', text: 'Estado: ' + imovel.endereco.estado},
            {style:'default', text: 'Cidade: ' + imovel.endereco.cidade},
            {style:'default', text: 'Bairro: ' + imovel.endereco.bairro},
            {style:'default', text: 'Rua: ' + imovel.endereco.rua},
            {style:'default', text: 'Numero: ' + imovel.endereco.numero},
            {style:'default', text: 'Complemento: ' + imovel.endereco.complemento},
            {style:'default', text: 'Ponto de referência: ' + imovel.endereco.pontoDeReferencia},
            {style:'default', text: 'Proprietário', style: 'subtitulo'},
            {style:'default', text: 'CPF/CNPJ: ' + imovel.proprietario.cpfCnpj },
            {style:'default', text: 'RG/Inscrição: ' + imovel.proprietario.rgInscricao },
            {style:'default', text: 'Nome: ' + imovel.proprietario.nome },
            {style:'default', text: 'Telefone: ' + imovel.proprietario.telefone },
            {style:'default', text: 'Celular: ' + imovel.proprietario.celular },
            {style:'default', text: 'Email: ' + imovel.proprietario.email },
            {style:'default', text: 'Endereço do Proprietário' , style: 'subtitulo'},
            {style:'default', text: 'Cidade: ' + imovel.proprietario.endereco.cidade },
            {style:'default', text: 'Bairro: ' + imovel.proprietario.endereco.bairro },
            {style:'default', text: 'Rua :' + imovel.proprietario.endereco.rua },
            {style:'default', text: 'Numero: ' + imovel.proprietario.endereco.numero },
            {style:'default', text: 'Complemento: ' + imovel.proprietario.endereco.complemento },
            {style:'default', text: 'Ponto de referência: ' + imovel.proprietario.endereco.pontoDeReferencia},
            {style:'default', text: 'Locatario', style: 'subtitulo'},
            {style:'default', text: 'CPF/CNPJ: ' + imovel.locatario.cpfCnpj},
            {style:'default', text: 'RG/Inscrição: ' + imovel.locatario.rgInscricao},
            {style:'default', text: 'Responsavel: ' + imovel.locatario.responsavel },
            {style:'default', text: 'Telefone: ' + imovel.locatario.telefone},
            {style:'default', text: 'Celular: ' + imovel.locatario.celular},
            {style:'default', text: 'Email: ' + imovel.locatario.email},
            {style:'default', text: 'Data de Inicio do contrato: ' + moment(imovel.locatario.dataInicioContrato).format('DD/MM/YYYY')},
            {style:'default', text: 'Data do fim do contrato: ' + moment(imovel.locatario.dataFimContrato).format('DD/MM/YYYY')},
            {style:'default', text: 'Valor: ' + imovel.locatario.valor},
            {style:'default', text: 'Seguro? ' + (imovel.locatario.seguro ? 'Sim' : 'Não')},
            {style:'default', text: 'Garantia: ' + imovel.locatario.garantia},
            {style:'default', text: 'Descrição da garantia: ' + imovel.locatario.descricaoGarantia},
            {style:'default', 
              text: 'Data de inicio de validade da garantia: ' + moment(imovel.locatario.dataInicioValidadeGarantia).format('DD/MM/YYYY')},
            {style:'default', 
              text: 'Data do fim da validade da garantia: ' + moment(imovel.locatario.dataFimValidadeGarantia).format('DD/MM/YYYY')},
            {style:'default', 
              text: 'Data de vencimento do seguro: ' + moment(imovel.locatario.dataVencimentoSeguro).format('DD/MM/YYYY')},
            {style:'default', text: 'Despesas', style: 'subtitulo'},
            {table: {
              body: despesas

            }},
            {style:'default', text:'Receitas', style:'subtitulo'},
            {table: {
              body:receitas
            }}
          ],
          styles:{
            header: {
              fontSize:22,
              bold:true,
              alignment: 'center'
            },
            subtitulo:
            {
              fontSize:18,
              bold:true,
              margin:5,
              alignment:'center'
            },
            default: {
              alignment: 'center'
            }
          }
        }
        pdfMake.createPdf(docDefinition).open()
      })
      })
      })
    })
  }
}
