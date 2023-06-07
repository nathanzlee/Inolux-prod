import mongoose from 'mongoose'

const purchaseOrderSchema = mongoose.Schema({
    documentNo: {type: String},
    entryDate: {type: Date},
    vendor: {
        type: mongoose.Schema.ObjectId,
        ref: 'partner'
    },
    deliveryDate: {type: Date},
    billingAddress: {type: {type: String}, address: {type: String}},
    shippingAddress: {type: {type: String}, address: {type: String}},
    items: [{
        item: {type: mongoose.Schema.ObjectId, ref: 'item'},
        quantity: {type: Number}
    }],
    notes: {type: String},
    value: {type: Number},
    status: {type: String}
})
// mongoose.models = {}
const purchaseOrder = mongoose.models.purchaseOrder || mongoose.model('purchaseOrder', purchaseOrderSchema)

export default purchaseOrder