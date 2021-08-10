import express from "express";
const router = express.Router()
import {
    addInventory,
} from '../controllers/inventoryController.js'
import {protect, admin} from '../middleware/authMiddleware.js'


router.route('/:id').post(protect, admin, addInventory)

export default router