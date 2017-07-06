const express = require('express');
let router = new express.Router();
let imovelController = require('./controllers/imovelController')
let loginController = require('./controllers/loginController')
let despesaController = require('./controllers/despesaController')
let receitaController = require('./controllers/receitaController')
let contactController = require('./controllers/contactController')
let userController = require('./controllers/userController')
let contratoController = require('./controllers/contratoController')
let estadoController = require('./controllers/estadoController')
let relatorioProprietariosController =
  require('./controllers/relatorios/relatorioProprietariosController')
let relatorioContasAPagarController = 
  require('./controllers/relatorios/relatorioContasAPagarController')
let relatorioContasAReceberController = 
  require('./controllers/relatorios/relatorioContasAReceberController')
let proprietarioController = require('./controllers/proprietarioController')
let multer = require('multer')
let upload = multer({dest: 'app/img/imoveis'})

router.get('/', (req,res) => res.send("OK"));
router.post('/login', loginController.login)
router.get('/imovel/:id', imovelController.getImovel)
router.put('/imovel/:id', imovelController.updateImovel)
router.get('/imoveis', imovelController.getImoveis)
router.post('/imovel', imovelController.addImovel)
router.get('/imoveisEmDestaque', imovelController.getDestaques)
router.get('/imoveisCarrossel',imovelController.getCarrossel)
router.get('/imoveisHomepage', imovelController.getHomepage)
router.get('/imovelPrincipal', imovelController.getPrincipal)
router.get('/buscarImoveisPorPrecoDeVenda/:from/:to', imovelController.buscarImoveisPorPrecoDeVenda)
router.get('/buscarImoveisPorPrecoDeLocacao/:from/:to', imovelController.buscarImoveisPorPrecoDeLocacao)
router.get('/searchImoveis/:search', imovelController.searchImoveis)
router.get('/buscarImoveisDisponiveis', imovelController.buscarImoveisDisponiveis)
router.get('/imovel/:id/titulo', imovelController.getTitulo)


router.post('/imovel/:id/addImage', upload.single('arquivo'), imovelController.addImage) 
router.post('/imovel/:id/addImages',upload.array('arquivos',10), imovelController.addImages)
router.delete('/imovel/:id/deleteImage/:imageId', imovelController.deleteImage)
router.put('/imovel/:id/image/:imageId', upload.single('arquivo'), imovelController.updateImage)
router.put('/imovel/:id/imagemPrincipal', upload.single('arquivo'), imovelController.updateImagemPrincipal)

router.delete('/imovel/:id', imovelController.removeImovel)

router.post('/imovel/:id/despesa', despesaController.addDespesa)
router.put('/imovel/:imovelId/despesa/:id', despesaController.updateDespesa)
router.get('/imovel/:imovelId/despesas', despesaController.getDespesas)
router.get('/imovel/:imovelId/despesas/:dataInicial/:dataFinal', despesaController.getDespesasByData)
router.delete('/despesa/:id', despesaController.deleteDespesa)

router.post('/imovel/:imovelId/receita', receitaController.addReceita)
router.put('/imovel/:imovelId/receita/:receitaId', receitaController.updateReceita)
router.get('/imovel/:imovelId/receita/:receitaId', receitaController.getReceita)
router.get('/imovel/:imovelId/receitas', receitaController.getReceitas)
router.get('/imovel/:imovelId/receitas/:dataInicial/:dataFinal', receitaController.getReceitasByData)
router.delete('/receita/:id', receitaController.deleteReceita)

router.post('/contact/sendMessage', contactController.sendMessage)

router.get('/usuarios', userController.getUsers)
router.get('/usuario/:id', userController.getUser)
router.post('/usuario', userController.addUser)
router.put('/usuario/:id', userController.updateUser)

router.get('/proprietarios', proprietarioController.getProprietarios)
router.post('/proprietario', proprietarioController.addProprietario)
router.get('/proprietario/:id', proprietarioController.getProprietario)
router.put('/proprietario/:id', proprietarioController.updateProprietario)
router.delete('/proprietario/:id', proprietarioController.removeProprietario)
router.get('/proprietario/:id/imoveis', proprietarioController.getImoveis)

router.get('/imoveis/relatorios/proprietarios/:proprietarioId/:dataInicial/:dataFinal/:cidadeId',
  relatorioProprietariosController.getRelatorio)
router.get('/imoveis/relatorios/contas-a-pagar/:proprietarioId/:dataVencimentoInicial/:dataVencimentoFinal/:cidadeId',
  relatorioContasAPagarController.getRelatorio)
router.get('/imoveis/relatorios/contas-a-receber/:proprietarioId/:dataRecebimentoInicial/:dataRecebimentoFinal/:cidadeId',
  relatorioContasAReceberController.getRelatorio)

router.get('/contrato/:id', contratoController.getContrato)
router.post('/contrato', contratoController.addContrato)
router.post('/contrato/:id/clausula', contratoController.addClausula)
router.get('/contratos', contratoController.getContratos)
router.get('/imovel/:imovelId/contrato/:contratoId', contratoController.getContratoImovel)


router.get('/estados',estadoController.getEstados)
router.get('/cidades/:estadoId',estadoController.getCidades)


module.exports = router;
