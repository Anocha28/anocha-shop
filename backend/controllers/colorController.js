import asyncHandler from 'express-async-handler'
import fs from 'fs'
import Color from '../models/colorModel.js'

//@dec      Fetch all colors
//@route    GET /api/products
//@access   Public
const getColors = asyncHandler (async (req, res) => {
    const colors = await Color.find({}).sort({createdAt: -1})
    res.json(colors)
})

//@dec      Create a color
//@route    POST /api/colors
//@access   Private Admin
const createColor = asyncHandler( async (req, res) => {
    const {code, name} = req.body
    const image = req.file.path
    const colorExist = await Color.findOne({code})
   if(colorExist){
       res.status(400)
       throw new Error('This color code already in used.')
   }

   const color = await Color.create({
       code,
       name,
       image,
   })

   if(color) {
       res.status(201).json(color)
   } else {
       res.status(400)
       throw new Error('Invalid color data.')
   }
})


//@dec      delete a color
//@route    DELETE /api/colors/:id
//@access   Private/admin
const deleteColor = asyncHandler (async (req, res) => {
    
    const color = await Color.findById(req.params.id)

    if(color){        
        fs.unlinkSync(color.image)
        await color.remove()
        res.json({message: 'Color removed'})
    } else {
        res.status(404)
        throw new Error('Color not found')
    }
})

//@dec      get color by id
//@route    GET /api/colors/:id
//@access   Private
const getColor = asyncHandler (async (req, res) => {
    
    const color = await Color.findById(req.params.id)

    if(color) {
        res.json(color)
    } else {
        res.status(404)
        throw new Error('Color not found.')
    }
})

//@dec      update a color
//@route    PUT /api/colors/:id
//@access   Private
const updateColor = asyncHandler (async (req, res) => {
    
    const color = await Color.findById(req.params.id)

    if(color) {
        if(req.file){
            fs.unlinkSync(color.image)
            color.code = req.body.code
            color.name = req.body.name
            color.image = req.file.path
            await color.save()
            res.json('Success')
        } else {
            color.code = req.body.code
            color.name = req.body.name
            color.image = req.body.image
            await color.save()
            res.json('Success')
        }   
    } else {
        res.status(404)
        throw new Error('Color not found.')
    }
})


export {
    getColors,
    createColor,
    deleteColor,
    getColor,
    updateColor,
}