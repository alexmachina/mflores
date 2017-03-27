const express = require('express');
let router = new express.Router();
let imovelController = require('./controllers/imovelController')
let loginController = require('./controllers/loginController')
let multer = require('multer')
let upload = multer({dest: 'app/img/imoveis'})

router.get('/', (req,res) => res.send("OK"));
router.post('/login', loginController.login)
router.get('/imovel/:id', imovelController.getImovel)
router.put('/imovel/:id', imovelController.updateImovel)
router.get('/imoveis', imovelController.getImoveis)
router.post('/imovel', imovelController.addImovel)

router.post('/imovel/:id/addImage', upload.single('arquivo'), imovelController.addImage)
router.delete('/imovel/:id/deleteImage/:imageId', imovelController.deleteImage)
router.put('/imovel/:id/image/:imageId', upload.single('arquivo'), imovelController.updateImage)

router.post('/imovel/:id/despesa', imovelController.addDespesa)
router.put('/imovel/:id/despesa/:despesaId', imovelController.updateDespesa)
router.get('/imovel/:id/despesas', imovelController.getDespesas)



module.exports = router;
