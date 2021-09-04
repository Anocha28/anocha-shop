import express from "express";
const router = express.Router()
import {
    getCagetories,
    addCagetory,
    deleteCategory,
    updateCategory,
} from '../controllers/categoryController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/')
        .get(getCagetories)
        .post(protect, admin, addCagetory)

router.route('/:id')
        .put(protect, admin, updateCategory)
        .delete(protect, admin, deleteCategory)


export default router