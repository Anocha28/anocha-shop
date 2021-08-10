import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import ContactUs from '../models/contactUsModel.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
//import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { sendEmail } from '../middleware/sendEmailMiddleware.js'

dotenv.config()



//@dec      Auth user & get token
//@route    POST /api/users/login
//@access   Public
const authUser = asyncHandler (async (req, res) => {

    const {email , password} = req.body

    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password.')
    }
})


//@dec      Register a new user
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler (async (req, res) => {

    const {name, email , password} = req.body

    const userExists = await User.findOne({email})

   if(userExists){
       res.status(400)
       throw new Error('This email is already in used.')
   }

   const user = await User.create({
       name,
       email,
       password
   })

   if(user) {
       res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
       })
   } else {
       res.status(400)
       throw new Error('Invalid user data.')
   }
})


//@dec      get user profile
//@route    GET /api/users/profile
//@access   Private
const getUserProfile = asyncHandler (async (req, res) => {
    
    const user = await User.findById(req.user._id)

    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found.')
    }
})

//@dec      update user profile
//@route    PUT /api/users/profile
//@access   Private
const updateUserProfile = asyncHandler (async (req, res) => {
    
    const user = await User.findById(req.user._id)

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }
    const updatedUser = await user.save()
    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
    })
    } else {
        res.status(404)
        throw new Error('User not found.')
    }
})


//@dec      get all users
//@route    POST /api/users
//@access   Private/admin
const getUsers = asyncHandler (async (req, res) => {
    
    const users = await User.find({})
    res.json(users)
})

//@dec      delete a user
//@route    DELETE /api/users/:id
//@access   Private/admin
const deleteUser = asyncHandler (async (req, res) => {
    
    const user = await User.findById(req.params.id)

    if(user){
        await user.remove()
        res.json({message: 'User removed'})
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


//@dec      get user by id
//@route    GET /api/users/:id
//@access   Private/admin
const getUserById = asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if(user){
        res.json(user)
    } else {
        res.status(400)
        throw new Error('User not found.')
    }   
})

//@dec      update user
//@route    PUT /api/users/:id
//@access   Private/Admin
const updateUser = asyncHandler (async (req, res) => {
    
    const user = await User.findById(req.params.id)

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin 
    const updatedUser = await user.save()
    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
    })
    } else {
        res.status(404)
        throw new Error('User not found.')
    }
})


//@dec      Register a new user
//@route    POST /api/users
//@access   Public
const contactUs = asyncHandler (async (req, res) => {

        const {title, content} = req.body
        const contactUs = await ContactUs.create({
            user: req.user._id,
            title,
            content
        })

        if(contactUs) {
            res.json(contactUs)
        } else {
            res.status(400)
            throw new Error('There is an error', error)
        }
})

//@dec      Register a new user
//@route    POST /api/users
//@access   Public
const contactUsList = asyncHandler (async (req, res) => {

    const pageSize = Number(req.query.pageSize) || 18
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await ContactUs.countDocuments({...keyword})
    const messages = await ContactUs
        .find({...keyword})
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .populate('user', 'name email')
        .sort({createdAt: -1})
    res.json({messages, page, pages: Math.ceil(count / pageSize)})

})

//@dec      delete a contact us message
//@route    DELETE /api/users/contact/:id
//@access   Private/admin
const deleteContactUsMessage = asyncHandler (async (req, res) => {
    
    const message = await ContactUs.findById(req.params.id)

    if(message){
        await message.remove()
        res.json({message: 'Message removed'})
    } else {
        res.status(404)
        throw new Error('Message not found')
    }
})


//@dec      password reset request
//@route    POST /api/users/forgot
//@access   Public
const passwordReset = asyncHandler (async (req, res) => {
    const {email, url} = req.body
    const user = await User.findOne({email: email})
    if(user) {
        
        const secret = process.env.JWT_SECRET
        const payload = {
            email: user.email,
            id: user._id
        }
        const token = jwt.sign(payload, secret, {expiresIn: '15m'})
        const link = `${url}/forgotpassword/${user._id}/${token}`
        
        await sendEmail(user.email, link)
        res.send('email sent')
        
    } else {
        res.status(404)
        throw new Error('Email not found. Please recheck.')
    }
})

//@dec      password reset user
//@route    PUT /api/users/:id/:token
//@access   Private/Admin
const passwordResetUser = asyncHandler (async (req, res) => {
    
    const {id, token} = req.params
    const user = await User.findById(id)
    
    if(user) {
        const secret = process.env.JWT_SECRET
        
            try {
                jwt.verify(token, secret)                
                user.password = req.body.password
                await user.save()
                
                res.json({message: 'success'})
            } catch (error) {
                console.log(error)
                res.status(404)
                throw new Error('Link is expired.')
            }
       
    } else {
        res.status(404)
        throw new Error('Something went wrong!')
    }
})









export {
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
}