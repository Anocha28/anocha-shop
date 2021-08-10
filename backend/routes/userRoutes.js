import express from "express";
const router = express.Router()
import {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    contactUs,
    contactUsList,
    deleteContactUsMessage,
    passwordReset,
    passwordResetUser,
} from '../controllers/userController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/')
        .post(registerUser)
        .get(protect, admin, getUsers)
router.post('/login', authUser)
router.route('/contact')
        .get(protect, admin, contactUsList)
        .post(protect, contactUs)
router.route('/contact/:id')
        .delete(protect, admin, deleteContactUsMessage)
router.route('/profile')
        .get(protect, getUserProfile)
        .put(protect, updateUserProfile)
router.route('/forgot')
        .post(passwordReset)
router.route('/:id/:token')
        .put(passwordResetUser)
router.route('/:id')
        .delete(protect,admin,deleteUser)
        .get(protect, admin, getUserById)
        .put(protect, admin, updateUser)


export default router