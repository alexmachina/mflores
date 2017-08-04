const imovelModel = require('../models/imovelModel'),
  proprietarioModel = require('../models/proprietarioModel')

function parseImovelInfo(corpoContrato, imovel) {
  return corpoContrato
    .replace('->titulo_imovel', imovel.titulo)
    .replace('->rgi_imovel', imovel.rgi)
    .replace('->instalacao_imovel', imovel.instalacao)
    .replace('->capacidadeInstalada_imovel', imovel.capacidadeInstalada)
    .replace('->observacaoGestor_imovel', imovel.observacaoGestor)
    .replace('->zoneamento_imovel', imovel.zoneamento)
    .replace('->tipo_imovel', imovel.tipo)
    .replace('->precoVenda_imovel', imovel.precoVenda)
    .replace('->precoLocacao_imovel', imovel.precoLocacao)
    .replace('->valorCondominio_imovel', imovel.valorCondominio)
    .replace('->valorAnualIPTU_imovel', imovel.valorAnualIPTU)
    .replace('->valorParceladoIPTU_imovel', imovel.valorParceladoIPTU)
}

function parseEnderecoInfo(corpoContrato, endereco) {
  return corpoContrato
    .replace('->estado_imovel', endereco.estado.nome)
    .replace('->cidade_imovel', endereco.cidade.nome)
    .replace('->cep_imovel', endereco.cep)
    .replace('->cidade_imovel', endereco.cidade)
    .replace('->rua_imovel', endereco.rua)
    .replace('->numero_imovel', endereco.numero)
    .replace('->bairro_imovel', endereco.bairro)
    .replace('->complemento_imovel', endereco.complemento)
    .replace('->pontoDeReferencia_imovel', endereco.pontoDeReferencia)
}

function parseLocatarioInfo(corpoContrato, locatario) {
  return corpoContrato
    .replace('->cpfCnpj_locatario', locatario.cpfCnpj)
    .replace('->nome_locatario', locatario.nome)
    .replace('->rgInscricao_locatario', locatario.rgInscricao)
    .replace('->responsavel_locatario', locatario.responsavel)
    .replace('->telefone_locatario', locatario.telefone)
    .replace('->celular_locatario', locatario.celular)
    .replace('->email_locatario', locatario.email)
    .replace('->dataInicioContrato', locatario.dataInicioContrato)
    .replace('->dataFimContrato', locatario.dataFimContrato)
    .replace('->valor_locatario', locatario.valor)
    .replace('->indiceDeReajuste_locatario', locatario.indiceDeReajuste)
    .replace('->seguro_locatario', locatario.seguro)
    .replace('->garantia_locatario', locatario.garantia)
    .replace('->descricaoGarantia_locatario', locatario.descricaoGarantia)
    .replace('->dataInicioValidadeGarantia_locatario', locatario.dataInicioValidadeGarantia)
    .replace('->dataFimValidadeGarantia_locatario', locatario.dataFimValidadeGarantia)
    .replace('->dataVencimentoSeguro_locatario', locatario.dataVencimentoSeguro)
}



class ContratoLib {
  gerarCorpo(corpoModelo, contrato) {
    return new Promise((resolve, reject) => {
      let promises = []

      try {
      let corpoContrato = 
        parseImovelInfo(corpoModelo, contrato.imovel)

      corpoContrato =
        parseEnderecoInfo(corpoContrato, contrato.imovel.endereco)

      corpoContrato =
        parseLocatarioInfo(corpoContrato, contrato.imovel.locatario)



      resolve(corpoContrato)
      } catch (ex) {
        reject(ex.message)

      }
    })

  }
}

module.exports = new ContratoLib()
