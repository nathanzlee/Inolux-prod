import { PENDING_STATUS } from '@/util/keywords'
import mongoose from 'mongoose'

const travelAuthSchema = mongoose.Schema({
    number: {type: Number},
    reqDate: {type: Date},
    international: {type: Boolean},
    purpose: {type: Array, default: []},
    startDate: {type: Date},
    endDate: {type: Date},
    itinerary: {type: Array, default: []},
    travelAdv: {advance: {type: Boolean}, amount: {type: Number}, disbursementDate: {type: Date}},
    personalTravel: {personal: {type: Boolean}, startDate: {type: Date}, endDate: {type: Date}},
    requestedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    approveBy: {
        type: [mongoose.Schema.ObjectId],
        ref: 'user'
    },
    employeeSig: {
        signature: {type: String}, 
        date: {type: Date}
    },
    managerSig: {
        user: {type: mongoose.Schema.ObjectId, ref: 'user'},
        signature: {type: String}, 
        date: {type: Date}
    },
    presidentSig: {
        type: {
            user: {type: mongoose.Schema.ObjectId, ref: 'user'},
            signature: {type: String}, 
            date: {type: Date}
        },
        default: null
    },
    revisionDate: {type: Date},
    notes: {type: String, default: ""},
    status: {type: String, default: PENDING_STATUS},
    customerType: {type: String},
})
mongoose.models = {}
const travel = mongoose.models.travelAuth || mongoose.model('travelAuth', travelAuthSchema)

export default travel