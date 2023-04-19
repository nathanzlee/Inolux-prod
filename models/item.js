import mongoose from 'mongoose'

const itemSchema = mongoose.Schema({
    documentNo: {type: String, default: 'ITM'},
    unitMeasurement: {type: String, default: ''},
    unitCost: {type: Number, default: 0},
    EAN: {type: Number, default: 0},
    name: {type: String, default: ''},
    make: {type: String, default: ''},
    itemGroup: {type: String, default: ''},
    UPC: {type: Number, default: 0},
    ISBN: {type: String, default: ''},
    description: {type: String, default: ''}
})
// mongoose.models = {}
const item = mongoose.models.item || mongoose.model('item', itemSchema)

export default item