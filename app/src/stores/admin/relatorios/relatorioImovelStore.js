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
        despesasArr.push(['Descrição', 'Valor', 'Mes', 'Ano'])
        despesas.forEach(d => {
          despesasArr.push([d.descricao, d.valor, d.mes, d.ano])
        })

        resolve(despesasArr)
      })
    })
  }

  @action generatePdf(id) {

    getJson(config.url + '/imovel/' + id).then(imovel => {
      this.getDespesas(imovel._id).then(despesas => {
        var docDefinition = {
          header: {text: imovel.titulo, style: 'header'},
          content: [
            {text: 'Tipo:' + imovel.tipo},
            {text: 'RGI: ' + imovel.rgi},
            {text: 'Instalação: ' + imovel.instalacao},
            {text: 'Observação: ' + imovel.observacaoGestor},
            {text: 'Zoneamento: ' + (imovel.zoneamento ? 'Sim':'Não')},
            {text: 'Metragem', style: 'subtitulo'},
            {text: 'Area total: ' + imovel.metragem.areaTotal},
            {text: 'Area construida: ' + imovel.metragem.areaConstruida},
            {text: 'Capacidade: ' + imovel.metragem.capacidade},
            {text: 'Endereço ', style:'subtitulo'},
            {text: 'Estado: ' + imovel.endereco.estado},
            {text: 'Cidade: ' + imovel.endereco.cidade},
            {text: 'Bairro: ' + imovel.endereco.bairro},
            {text: 'Rua: ' + imovel.endereco.rua},
            {text: 'Numero: ' + imovel.endereco.numero},
            {text: 'Complemento: ' + imovel.endereco.complemento},
            {text: 'Ponto de referência: ' + imovel.endereco.pontoDeReferencia},
            {text: 'Proprietário', style: 'subtitulo'},
            {text: 'CPF/CNPJ: ' + imovel.proprietario.cpfCnpj },
            {text: 'RG/Inscrição: ' + imovel.proprietario.rgInscricao },
            {text: 'Nome: ' + imovel.proprietario.nome },
            {text: 'Telefone: ' + imovel.proprietario.telefone },
            {text: 'Celular: ' + imovel.proprietario.celular },
            {text: 'Email: ' + imovel.proprietario.email },
            {text: 'Endereço do Proprietário' , style: 'subtitulo'},
            {text: 'Cidade: ' + imovel.proprietario.endereco.cidade },
            {text: 'Bairro: ' + imovel.proprietario.endereco.bairro },
            {text: 'Rua :' + imovel.proprietario.endereco.rua },
            {text: 'Numero: ' + imovel.proprietario.endereco.numero },
            {text: 'Complemento: ' + imovel.proprietario.endereco.complemento },
            {text: 'Ponto de referência: ' + imovel.proprietario.endereco.pontoDeReferencia},
            {text: 'Locatario', style: 'subtitulo'},
            {text: 'CPF/CNPJ: ' + imovel.locatario.cpfCnpj},
            {text: 'RG/Inscrição: ' + imovel.locatario.rgInscricao},
            {text: 'Responsavel: ' + imovel.locatario.responsavel },
            {text: 'Telefone: ' + imovel.locatario.telefone},
            {text: 'Celular: ' + imovel.locatario.celular},
            {text: 'Email: ' + imovel.locatario.email},
            {text: 'Data de Inicio do contrato: ' + moment(imovel.locatario.dataInicioContrato).format('DD/MM/YYYY')},
            {text: 'Data do fim do contrato: ' + moment(imovel.locatario.dataFimContrato).format('DD/MM/YYYY')},
            {text: 'Valor: ' + imovel.locatario.valor},
            {text: 'Seguro? ' + (imovel.locatario.seguro ? 'Sim' : 'Não')},
            {text: 'Garantia: ' + imovel.locatario.garantia},
            {text: 'Descrição da garantia: ' + imovel.locatario.descricaoGarantia},
            {text: 'Data de inicio de validade da garantia: ' + moment(imovel.locatario.dataInicioValidadeGarantia).format('DD/MM/YYYY')},
            {text: 'Data do fim da validade da garantia: ' + moment(imovel.locatario.dataFimValidadeGarantia).format('DD/MM/YYYY')},
            {text: 'Data de vencimento do seguro: ' + moment(imovel.locatario.dataVencimentoSeguro).format('DD/MM/YYYY')},
            {text: 'Despesas', style: 'subtitulo'},
            {table: {
              body: despesas
              
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
              margin:5
            }
          }
        }
        pdfMake.createPdf(docDefinition).open()
      })
    })
  }
}
