const express=require('express');
const productsApiController = require('../controller/productsApiController')


const router =express.Router()

router.post('/create/products', productsApiController.createProduct)
router.get('/products', productsApiController.getProduct)
router.get('/edit/:id', productsApiController.getEditProduct)
router.put('/update/:id', productsApiController.updateProduct)
router.delete('/delete/:id', productsApiController.deleteProduct)

module.exports=router