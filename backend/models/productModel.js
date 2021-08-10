import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
    name: {type: String, required: true},
    rating: {type: Number, required: true},
    comment: {type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
}, {timestamps: true})

const inventorySchema = mongoose.Schema({
    color: {type: mongoose.Schema.Types.ObjectId, required: true},
    detail: [{
        size : {type: String, required: true},
        qty: {type: Number, required: true, default: 0}   
    }]  
})

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    color: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Color'
    }], 
    inventory: [inventorySchema],
    reviews: [reviewSchema], 
    images: [{type: String, required: true}],
    size: [String],
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    
    numReviews: {
        type: Number,
        default: 0
    },
    stockCount: {
        type: Number,
        default: 0
    },    
},{
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export default Product