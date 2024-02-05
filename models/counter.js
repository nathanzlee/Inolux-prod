import mongoose from 'mongoose'

const counterSchema = mongoose.Schema({
    name: {type: String},
    count: {type: Number, default: 0},
})

const counter = mongoose.models.counter || mongoose.model('counter', counterSchema)

export default counter