import fs from 'fs'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//@dec      Fetch all products
//@route    GET /api/products
//@access   Public
const getProducts = asyncHandler (async (req, res) => {
    
    const pageSize = Number(req.query.pageSize) || 18
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).select('-inventory').limit(pageSize).skip(pageSize * (page - 1))
    res.json({products, page, pages: Math.ceil(count / pageSize)})
})


//@dec      get inventory list
//@route    GET /api/products/inventory
//@access   Private/Admin
const getInventory = asyncHandler (async (req, res) => {    
    const products = await Product
        .find({})
        .select('_id code inventory')
        .populate({
            path: 'inventory',
            populate: {
                path: 'color',
                model: 'Color',
                select: ['name', 'code', 'image']
            }
        })
    res.json(products)
})


//@dec      Fetch a products
//@route    GET /api/products/id
//@access   Public
const getProductById = asyncHandler( async (req, res) => {
    
    const product = await Product
        .findById(req.params.id)
        .populate('user', 'name')
        .populate('color', ['name','code', 'image'])
        .populate({
            path: 'inventory',
            populate: {
                path: 'color',
                model: 'Color',
                select: ['name', 'code', 'image']
            }
        })
    
    if(product){
        res.json(product)
    } else {
        res.status(404)
        throw new Error("Product not found")
    }
})


//@dec      Delete a products
//@route    DELETE /api/products/:id/edit
//@access   Private Admin
const deleteProduct = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id)
    
    if(product){
        try {
            for(let i = 0; i < product.images.length; i++) {
                fs.unlinkSync(product.images[i])
            }
            await product.remove()
         res.json({message: 'Product deleted'})
        } catch (error) {
            throw new Error(error)
        }
        
    } else {
        res.status(404)
        throw new Error("Product not found")
    }
})


//@dec      Create a products
//@route    POST /api/products
//@access   Private Admin
const createProduct = asyncHandler( async (req, res) => {
    const {code, name, description , price, category} = req.body
    const productExists = await Product.findOne({code})
    //console.log(req.body)
   if(productExists){
       res.status(400)
       throw new Error('This product code already in used.')
   }

   let imagePaths = []
   req.files.forEach(f => {
       const file = {
           fileName: f.originalname,
           filePath: f.path,
           fileType: f.mimetype,
       }
       //imagesArray.push(file)
       imagePaths.push(file.filePath)
   })
   const sizeList = req.body.size.split(',')
   let colorAdd
   if(req.body.color) colorAdd = req.body.color.split(',')
   //console.log(sizeList)
   const product = await Product.create({
       user: req.user._id,
       code,
       name,
       description,
       price,
       category,
       size: sizeList,
       color: colorAdd,
       images: imagePaths,
   })

   if(product) {
       res.status(201).json(product)
   } else {
       res.status(400)
       throw new Error('Invalid product data.')
   }
})


//@dec      Update a products
//@route    PUT /api/products
//@access   Private Admin
const updateProduct = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        const {code, name, description, price, category, size, color, images} = req.body
        
        if(req.files) {
            let imagePaths = []
            req.files.forEach(f => {
                const file = {
                    fileName: f.originalname,
                    filePath: f.path,
                    fileType: f.mimetype
                }
                imagePaths.push(file.filePath)
            })
            let sizeList=[], colorList=[], imageList=[]
            if(size) sizeList = req.body.size.split(',')
            if(color) colorList = req.body.color.split(',')
            if(images) imageList = req.body.images.split(',')

            const imagesToDelete = product.images.filter(x => !imageList.includes(x))
            for(let i = 0; i < imagesToDelete.length; i++) {
                fs.unlinkSync(imagesToDelete[i])
            }
            
            let allImages = imageList.concat(imagePaths)

            product.code = code
            product.name = name
            product.description = description
            product.price = price
            product.category = category
            product.size = sizeList
            product.color = colorList
            product.images = allImages
            await product.save()
            res.json({message: "successfully updated"})
        
        } else {

            let sizeList, colorList, imageList
            if(size) sizeList = req.body.size.split(',')
            if(color) colorList = req.body.color.split(',')
            if(images) imageList = req.body.images.split(',')

            let allImages = product.images
                                .filter(x => !imageList.includes(x))
                                .concat(imageList.filter(x => !product.images.includes(x)));

            product.code = code
            product.name = name
            product.description = description
            product.price = price
            product.category = category
            product.size = sizeList
            product.color = colorList
            product.images = allImages
            await product.save()
            res.json({message: "successfully updated"})
        }

    } else {
        res.status(400)
        throw new Error('Product not found')
    }
    
})

//@dec      Create new review
//@route    POST /api/products/:id/reviews
//@access   Private 
const createProductReview = asyncHandler( async (req, res) => {
    const {rate, comment} = req.body
    const product = await Product.findById(req.params.id)

   if(product) {
       const alreadyReviewed = product.reviews.find( r => r.user.toString() === req.user._id.toString())
       if(alreadyReviewed){
           res.status(400)
           throw new Error('You already rated and reviewed this product.')
       } 
       
       const review = {
           name: req.user.name,
           rating: Number(rate),
           comment,
           user: req.user._id
       }
       product.reviews.push(review)
       product.numReviews = product.reviews.length
       product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

       await product.save()
       res.status(201).json({message: 'Review added.'})
   } else {
       res.status(400)
       throw new Error('Invalid product data.')
   }
})


//@dec      get top rated products
//@route    GET /api/products/top
//@access   Public 
const getTopProducts = asyncHandler( async (req, res) => {    
    const products = await Product.find({}).sort({rating: -1}).limit(5)
    if(products) {
        res.json(products)
    } else {
        res.status(400)
        throw new Error('Invalid products data.')
    }
})


//@dec      get product by sorted date
//@route    GET /api/products/shopnow
//@access   Public
const getShopNow = asyncHandler (async (req, res) => {    
    const products = await Product
        .find({})
        .sort({createdAt: -1})
        .select('-inventory')
        .limit(50)
    res.json(products)
})


export {
    getProducts, 
    getProductById, 
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts,
    getInventory,
    getShopNow,
}