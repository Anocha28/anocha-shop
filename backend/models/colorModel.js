import mongoose from 'mongoose'

const colorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    }
},{
    timestamps: true
})

const Color = mongoose.model('Color', colorSchema)

export default Color