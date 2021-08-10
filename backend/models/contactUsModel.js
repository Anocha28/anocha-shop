import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },

},{
    timestamps: true
})



const ContactUs = mongoose.model('ContactUs', userSchema)

export default ContactUs