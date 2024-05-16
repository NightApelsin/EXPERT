const Router = require('express');
const router = Router();
const productController = require('../Controllers/product.controller.js')
const coockieSetter = require('../CookieSetter/setter.js')
const addQController = require('../Controllers/addConsultQ.controller.js')
const SMTP = require('../SMTP/provider.js')

router.get('/catalog', productController.getAllProducts)
router.get('/catalog/:id', productController.getOneProduct)
router.post('/cookie', coockieSetter.coockieSetter)
router.post('/cookie/history', coockieSetter.coockieSetHistory)
router.post('/addPersonOnConsultQueue', addQController.addConsulQ)
router.post('/SMTP/getVerificationCode', SMTP.sendEmail)
module.exports = router;