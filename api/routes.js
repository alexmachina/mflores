const express = require('express');
let router = new express.Router();
let imovelController = require('./controllers/imovelController')
let loginController = require('./controllers/loginController')
let despesaController = require('./controllers/despesaController')
let receitaController = require('./controllers/receitaController')
let contactController = require('./controllers/contactController')
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


router.post('/imovel/:id/addImage', upload.single('arquivo'), imovelController.addImage)
router.delete('/imovel/:id/deleteImage/:imageId', imovelController.deleteImage)
router.put('/imovel/:id/image/:imageId', upload.single('arquivo'), imovelController.updateImage)
router.put('/imovel/:id/imagemPrincipal', upload.single('arquivo'), imovelController.updateImagemPrincipal)

router.delete('/imovel/:id', imovelController.removeImovel)

router.post('/imovel/:id/despesa', despesaController.addDespesa)
router.put('/imovel/:imovelId/despesa/:id', despesaController.updateDespesa)
router.get('/imovel/:imovelId/despesas', despesaController.getDespesas)
router.get('/imovel/:imovelId/despesas/:dataInicial/:dataFinal', despesaController.getDespesasByData)

router.post('/imovel/:imovelId/receita', receitaController.addReceita)
router.put('/imovel/:imovelId/receita/:receitaId', receitaController.updateReceita)
router.get('/imovel/:imovelId/receita/:receitaId', receitaController.getReceita)
router.get('/imovel/:imovelId/receitas', receitaController.getReceitas)
router.get('/imovel/:imovelId/receitas/:dataInicial/:dataFinal', receitaController.getReceitasByData)

router.post('/contact/sendMessage', contactController.sendMessage)



module.exports = router;
