import mongoose from 'mongoose'
import dotenv from 'dotenv'

import users from '../data/Users.js'
import products from '../data/Products.js'
import colors from '../data/Colors.js'

import User from '../models/userModel.js'
import Product from '../models/productModel.js'
import Order from '../models/orderModel.js'
import Color from '../models/colorModel.js'


import connectDB from './db.js'

dotenv.config()
connectDB()


const importData = async() => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        await Color.deleteMany()

        const createdColors = await Color.insertMany(colors)
        const createdUsers = await User.insertMany(users)

        //create random color array
        const colorAdding = createdColors.map(color => {
            return color._id
        })
        // console.log(colorAdding)
        // var color1 = await colorAdding[Math.floor(Math.random()*colorAdding.length)],
        // var color2 = await colorAdding[Math.floor(Math.random()*colorAdding.length)],
        // var color3 = await colorAdding[Math.floor(Math.random()*colorAdding.length)],
        // var color4 = await colorAdding[Math.floor(Math.random()*colorAdding.length)],

        // const colorsToAdd = [
        //     colorAdding[Math.floor(Math.random()*colorAdding.length)],
        //     colorAdding[Math.floor(Math.random()*colorAdding.length)],
        //     colorAdding[Math.floor(Math.random()*colorAdding.length)],
        //     colorAdding[Math.floor(Math.random()*colorAdding.length)],
        // ]
        // const finalColors = [...new Set(colorsToAdd)]
        // console.log(finalColors)
        //color finish here



        //creating inventory
        const sizeXS = colorAdding.map((c)=>{
        return { size: 'XS', color: c, qty: Math.floor(Math.random()*100)}       
        })
        const sizeS = colorAdding.map((c)=>{
        return { size: 'S', color: c, qty: Math.floor(Math.random()*100)}       
        })
        const sizeM = colorAdding.map((c)=>{
        return { size: 'M', color: c, qty: Math.floor(Math.random()*100)}       
        })
        const sizeL = colorAdding.map((c)=>{
        return { size: 'L', color: c, qty: Math.floor(Math.random()*100)}       
        })
        const sizeXL = colorAdding.map((c)=>{
        return { size: 'XL', color: c, qty: Math.floor(Math.random()*100)}       
        })
        const finalInventory = sizeXS.concat(sizeS, sizeM, sizeL, sizeXL)

        // const abcde = finalColors.map(c => {
        //         return ['XS', 'S', 'M', 'L', 'XL'].map(s => 
        //             {return {size: s, color: c}}
        //             ) 
        //         })

        const adminUser = createdUsers[0]._id


        const sampleProducts = products.map(product => {
            return {...product, user: adminUser, color: colorAdding, inventory: finalInventory}
        })

        await Product.insertMany(sampleProducts)
        console.log('Data imported sucessfully')
        process.exit()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

const destoryData = async() => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        await Color.deleteMany()
        console.log('Data destoried')
        process.exit()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

if(process.argv[2] === '-d') {
    destoryData()
} else {
    importData()
}