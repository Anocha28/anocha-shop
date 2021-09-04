import express from "express";
const router = express.Router()
import {
    addInventory,
    deleteInventory,
    updateInventory,
} from '../controllers/inventoryController.js'
import {protect, admin} from '../middleware/authMiddleware.js'


router.route('/:id')
    .post(protect, admin, addInventory)
    .put(protect, admin, updateInventory)
router.route('/:productId/:inventoryId').delete(protect, admin, deleteInventory)

export default router