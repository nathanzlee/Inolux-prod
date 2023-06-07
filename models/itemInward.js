import mongoose from 'mongoose'

const itemInwardSchema = mongoose.Schema({
    entryDate: {type: Date},
    reference: {type: String},
    vendor: {
        type: mongoose.Schema.ObjectId,
        ref: 'partner'
    },
    receiveDate: {type: Date},
    postingDate: {type: Date},
    items: [{
        item: {type: mongoose.Schema.ObjectId, ref: 'item'},
        quantity: {type: Number},
        location: {type: mongoose.Schema.ObjectId, ref: 'location'}
    }],
    notes: {type: String},
    value: {type: Number}
})
// mongoose.models = {}
const itemInward = mongoose.models.itemInward || mongoose.model('itemInward', itemInwardSchema)

export default itemInward