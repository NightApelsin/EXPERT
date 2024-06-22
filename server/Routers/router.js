const Router = require('express');
const router = Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../EXPERT/server/Frontend/source/productImage'); // Укажите путь для сохранения файлов
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Уникальное имя файла
    }
});
const upload = multer({ storage: storage });

const User = require('../Models/User.model.js')
const Product = require('../Models/Product.model.js')
const Order = require('../Models/Order.model.js')

const cookieParser = require('cookie-parser');

const coockieSetter = require('../CookieSetter/setter.js')
const productController = require('../Controllers/product.controller.js')
const addQController = require('../Controllers/addConsultQ.controller.js')
const orderController = require('../Controllers/orders.controller.js')
const authentication = require('../Controllers/authentification.controller.js')
const commentController = require('../Controllers/comments.controller.js')
const administrationController = require('../Controllers/administration.controller.js')
const SMTP = require('../SMTP/provider.js')


router.post('/catalog', Product.getAllProducts)
router.post('/catalog/:id', Product.getOneProduct)
router.post('/cookie/history', coockieSetter.coockieSetHistory)
router.post('/addPersonOnConsultQueue', addQController.addConsulQ)
router.post('/SMTP/getVerificationCode', SMTP.sendEmail)
router.post('/verifyAccess', authentication.verifyEmailCode)
router.post('/isRemember', authentication.isRememberMe)
router.post('/login', authentication.login)
router.post('/signUp', authentication.createUser)
router.post('/getUser', User.getUser)
router.post('/getUserById', User.getUserById)
router.post('/logOut', authentication.logOut)
router.post('/createOrder', orderController.createOrder)
router.post('/getAllOrders', Order.getAllOrders)
router.post('/getProductComments/:id', commentController.getProductComments)
router.post('/addComment', commentController.addComment)

router.put('/admin/saveMainImage', upload.single('file'), productController.saveMainImage)
router.put('/admin/saveSourceImage', upload.single('file'), productController.saveSourceImage)
router.post('/admin/createProduct', productController.createProduct)
router.put('/admin/updateProduct', productController.updateProduct)
router.delete('/admin/deleteProduct', productController.deleteProduct)


router.post('/admin/isVerified', administrationController.isVerified)
router.post('/admin/login', administrationController.logIn)
router.post('/admin/getUsers', administrationController.getAllProfiles)
router.post('/admin/getProducts', administrationController.getAllProducts)
router.post('/admin/getProductsParameters', administrationController.getProductParameters)
router.post('/admin/updateUser', administrationController.updateUser)
router.post('/admin/deleteUser', administrationController.deleteUser)
module.exports = router;