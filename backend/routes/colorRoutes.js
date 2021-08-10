import express from "express";
const router = express.Router()
import {
    getColors, 
    createColor,
    deleteColor,
    getColor,
    updateColor,
} from '../controllers/colorController.js'
import {protect, admin} from '../middleware/authMiddleware.js'
import {colorUpload} from '../middleware/fileUpload.js'


router.route('/').get(protect, admin, getColors)
router.route('/:id')
    .get(protect, admin, getColor)
    .put(protect, admin, colorUpload.single('files'), updateColor)
    .delete(protect, admin, deleteColor)
router.route('/new')
    .post(protect, admin, colorUpload.single('files'), createColor)

export default router