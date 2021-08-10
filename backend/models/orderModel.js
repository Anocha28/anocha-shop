import mongoose from 'mongoose'
import shortid from 'shortid'

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    code: {
        type: String,
        default: shortid.generate,
        unique: true,
    },
    orderItems: [
        {
            name: {type: String, required: true},
            qty: {type: Number, required: true},
            image: {type: String, required: true},
            price: {type: Number, required: true},
            productId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'},
            color: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Color'},
            size: {type: String, required: true}
        }
    ],
    shippingAddress: {
        address: {type: String, required: true},
        city: {type: String, required: true},
        postalCode: {type: String, required: true},
        province: {type: String, required: true},
        country: {type: String, required: true},
        phone: {type: String, required: true},
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: {
        id: {type: String},
        status: {type: String},
        update_time: {type: String},
        email_address: {type: String},
    },
    taxPrice: {
        type: Number,
        requried: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        requried: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        requried: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
},
{
    timestamps: true,
})

const Order = mongoose.model('Order', orderSchema)

export default Order