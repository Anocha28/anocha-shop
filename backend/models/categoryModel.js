import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
   
},{
    timestamps: true
})


const Cagetory = mongoose.model('Cagetory', categorySchema)

export default Cagetory