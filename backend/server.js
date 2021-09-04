import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cors from 'cors'
import morgan from 'morgan'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import productRoutes from '../backend/routes/productRoutes.js'
import userRoutes from '../backend/routes/userRoutes.js'
import uploadRoutes from '../backend/routes/uploadRoutes.js'
import colorRoutes from '../backend/routes/colorRoutes.js'
import categoryRoutes from '../backend/routes/categoryRoutes.js'
import orderRoutes from '../backend/routes/orderRoutes.js'
import inventoryRoutes from '../backend/routes/inventoryRoutes.js'
import expressSM from 'express-status-monitor'

dotenv.config()
connectDB()
const app = express ()

app.use(expressSM());
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/colors', colorRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/inventory', inventoryRoutes)
app.use('/api/upload', uploadRoutes)


app.get('/api/config/paypal', (req, res)=> res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use('/colors', express.static(path.join(__dirname, '/colors')))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res)=> {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res)=> {
        res.send('API is running....')
    })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))