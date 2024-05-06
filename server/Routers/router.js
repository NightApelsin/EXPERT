const Router = require('express');
const router = Router();
const productController = require('../Controllers/product.controller.js')
const coockieSetter = require('../CookieSetter/setter.js')


router.get('/catalog', productController.getAllProducts)
router.get('/catalog/:id', productController.getOneProduct)
router.post('/cookie', coockieSetter.coockieSetter)
router.post('/cookie/history', coockieSetter.coockieSetHistory)

module.exports = router;