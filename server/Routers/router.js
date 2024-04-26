const Router = require('express');
const router = Router();
const productController = require('../Controllers/product.controller.js')


router.get('/catalog', productController.getAllProducts)


module.exports = router;