const Router = require('express');
const router = Router();
const productController = require('../Controllers/product.controller.js')


router.get('/catalog', productController.getAllProducts)
router.get('/catalog/:id', productController.getOneProduct)


module.exports = router;