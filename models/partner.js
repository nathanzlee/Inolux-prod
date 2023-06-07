import mongoose from 'mongoose'

const partnerSchema = mongoose.Schema({
    name: {type: String},
    type: {type: String},
    address: {type: String},
    dateAdded: {type: Date}
})
// mongoose.models = {}
const partner = mongoose.models.partner || mongoose.model('partner', partnerSchema)

export default partner