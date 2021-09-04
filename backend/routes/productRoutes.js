import express from "express";
const router = express.Router()
import {
    getProducts, 
    getProductById, 
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    deleteProductReview,
    getTopProducts,
    getInventory,
    getShopNow,
} from '../controllers/productController.js'
import {protect, admin} from '../middleware/authMiddleware.js'
import {fileUpload} from '../middleware/fileUpload.js'


router.route('/')
    .get(getProducts)
router.route('/new')
    .post(protect, admin, fileUpload.array('files'), createProduct)
router.route('/top')
    .get(getTopProducts)
router.route('/inventory')
    .get(protect, admin, getInventory)
router.route('/shopnow')
    .get(getShopNow)
router.route('/:productId/:reviewId')
    .delete(protect, deleteProductReview)
router.route('/:id')
    .get(getProductById)
    .put(protect, admin, fileUpload.array('files'), updateProduct)
    .delete(protect, admin, deleteProduct)
router.route('/:id/reviews')
    .post(protect, createProductReview)


export default router