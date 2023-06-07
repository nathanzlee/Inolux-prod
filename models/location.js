import mongoose from 'mongoose'

const locationSchema = mongoose.Schema({
    name: {type: String},
    address: {type: String},
    description: {type: String}
})
// mongoose.models = {}
const location = mongoose.models.location || mongoose.model('location', locationSchema)

export default location