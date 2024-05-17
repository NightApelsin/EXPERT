const Router = require('express');
const router = Router();
const productController = require('../Controllers/product.controller.js')
const coockieSetter = require('../CookieSetter/setter.js')
const addQController = require('../Controllers/addConsultQ.controller.js')
const SMTP = require('../SMTP/provider.js')
const accessVerificator = require('../Controllers/accessVerification.controller.js')

router.get('/catalog', productController.getAllProducts)
router.get('/catalog/:id', productController.getOneProduct)
//router.post('/cookie', coockieSetter.coockieSetter)
router.post('/cookie/history', coockieSetter.coockieSetHistory)
router.post('/addPersonOnConsultQueue', addQController.addConsulQ)
router.post('/SMTP/getVerificationCode', SMTP.sendEmail)
router.post('/verifyAccess', accessVerificator.verifyEmailCode)
router.post('/login', accessVerificator.login)
router.post('/signUp', accessVerificator.createUser)
module.exports = router;