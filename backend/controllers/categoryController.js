import asyncHandler from 'express-async-handler'
import Category from '../models/categoryModel.js'


//@dec      get all categories
//@route    GET /api/cagetory
//@access   Public
const getCagetories = asyncHandler (async (req, res) => {

    const categories = await Category.find({}).sort({createdAt: -1})
    res.json(categories)
})

//@dec      add a categories
//@route    POST /api/cagetory
//@access   Private/Admin
const addCagetory = asyncHandler (async (req, res) => {

    const {category} = req.body
    //console.log(category)
    const existingCategoy = await Category.findOne({category})
    if(existingCategoy){
        res.status(400)
        throw new Error("Category name is already exist.")
    }
    const addedCategory = await Category.create({
        category
    })

    if(addedCategory) {
        res.status(201).json({"message": "Sucessfully created new category."})
    } else {
        res.status(400)
        throw new Error('Invalid category data.')
    }
})

//@dec      delete a category
//@route    DELETE /api/category/:id
//@access   Private/admin
const deleteCategory = asyncHandler (async (req, res) => {    
    const category = await Category.findById(req.params.id)
    if(category){                
        await category.remove()
        res.json({message: 'Category removed'})
    } else {
        res.status(404)
        throw new Error('Something went wrong. Category not found')
    }
})

//@dec      update a category
//@route    PUT /api/category/:id
//@access   Private/admin
const updateCategory = asyncHandler (async (req, res) => {
    const category = await Category.findById(req.params.id)
    if(category) {  
        category.category = req.body.category
        await category.save()
        res.json('Success')
          
    } else {
        res.status(404)
        throw new Error('Category not found.')
    }
})


export {
    getCagetories,
    addCagetory,
    deleteCategory,
    updateCategory,
}