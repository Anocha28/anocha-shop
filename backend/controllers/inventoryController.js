
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'
import Color from '../models/colorModel.js'
import mongoose from 'mongoose'

//@dec      Add inventory to a product
//@route    POST /api/inventory/:id
//@access   Private Admin
const addInventory = asyncHandler( async (req, res) => {
    const {colorId, detail} = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        const inventoryExist = product.inventory.find(
          (p) => p.color.toString() === colorId.toString()
        )
    
        if (inventoryExist) {
          res.status(400)
          throw new Error('Inventory for this color already exist, edit the inentory instead of adding.')
        }
    
        let invDetail = []
        detail.forEach(d => {
            const file = {
                size: d.size,
                qty: d.qty,
            }
            invDetail.push(file)
        })

        const inventory = {
          color: colorId,
          detail: invDetail,
        }
    
        product.inventory.push(inventory)
    
        await product.save()
        res.json({message: 'success'})
      } else {
        res.status(404)
        throw new Error('Product not found')
      }
})



//@dec      delete a inventory of a product
//@route    DELETE /api/inventory/:productId/:inventoryId
//@access   Private Admin
const deleteInventory = asyncHandler( async (req, res) => {
  const {productId, inventoryId} = req.params
  
  const product = await Product.findById(productId)

  if (product) {
        const inventory = product.inventory.find(
          (p) => p._id.toString() === inventoryId.toString()
        )
    
        if (!inventory) {
          res.status(400)
          throw new Error('Inventory does not exist.')
        }
        
        await inventory.remove()
        await product.save()
        // const index = product.inventory.findIndex(i => i._id === inventoryId)
        // console.log(index)
        //await product.inventory.splice(_id.toString() === inventoryId.toString(), 1)
        //await product.save()
        res.json({message: 'success'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})


//@dec      update inventory to a product
//@route    PUT /api/inventory/:id
//@access   Private Admin
const updateInventory = asyncHandler( async (req, res) => {
  const {colorId, detail} = req.body
 
  const product = await Product.findById(req.params.id)

  if (product) {
      const inventoryExist = product.inventory.find(
        (p) => p.color.toString() === colorId.toString()
      )

      if (!inventoryExist) {
        res.status(400)
        throw new Error('Inventory does not exist.')
      }
      await inventoryExist.remove()
  
      let invDetail = []
      detail.forEach(d => {
          const file = {
              size: d.size,
              qty: d.qty,
          }
          invDetail.push(file)
      })

      const inventory = {
        color: colorId,
        detail: invDetail,
      }
  
      product.inventory.push(inventory)
  
      await product.save()
      res.json({message: 'success'})
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
})


export {
  addInventory,
  deleteInventory,
  updateInventory,
}