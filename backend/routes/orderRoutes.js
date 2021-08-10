import express from "express";
const router = express.Router()
import {
    getOrders,
    createOrder,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    updateOrderToDelivered,
} from '../controllers/orderController.js'
import {protect, admin} from '../middleware/authMiddleware.js'


router.route('/').get(protect, admin, getOrders).post(protect, createOrder)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)


export default router