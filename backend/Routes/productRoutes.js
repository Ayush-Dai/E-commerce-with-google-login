const express= require("express");
const {getProducts, getProductById, createProduct,editProduct,deleteProduct}=require('../controllers/productController');
const router=express.Router();
const uploadMiddleware= require("../middleware/uploadMiddleware");
const authMiddleware=require("../middleware/authMiddleware")
const adminMiddleware=require("../middleware/adminMiddleware");

router.get('/products',authMiddleware,getProducts);
router.get('/products/:id',authMiddleware,getProductById);
router.post('/addproducts',authMiddleware,adminMiddleware,uploadMiddleware.single("image"),createProduct);
router.put('/updateProduct/:id',authMiddleware,adminMiddleware,editProduct);
router.delete('/deleteProduct/:id',authMiddleware,adminMiddleware,deleteProduct);


module.exports=router;
