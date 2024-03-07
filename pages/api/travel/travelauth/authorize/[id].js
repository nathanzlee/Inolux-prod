import connectDB from '../../../../../util/connectDB'
import TravelAuth from '../../../../../models/travelAuth'
import User from '../../../../../models/user'
import { sendEmail_advDisbursementNeeded, sendEmail_travelAuthApproved, sendEmail_travelAuthDenied } from '../../../../../util/nodemailer'
import { DENIED_STATUS, TRAVEL_ADVANCE_DISBURSEMENT_EMAIL } from '@/util/keywords'
import { getSession } from 'next-auth/react'

connectDB()

export default async function handler(req, res) {
    if (req.body.status == DENIED_STATUS) {
        await denyTravelAuth(req, res)
    } else {
        await authorizeTravelAuth(req, res)
    }
}

const authorizeTravelAuth = async (req, res) => {
    const session = await getSession({req})
    try {
        const requesterTravelAuth = await TravelAuth.findOne({_id: req.query.id}).populate('requestedBy')
        if (req.body.role == 'manager') {
            await TravelAuth.updateOne({_id: req.query.id}, {$set: {'managerSig.signature': req.body.signature, 'managerSig.date': req.body.date, status: req.body.status, notes: req.body.notes}})
        } else {
            await TravelAuth.updateOne({_id: req.query.id}, {$set: {'presidentSig.signature': req.body.signature, 'presidentSig.date': req.body.date, status: req.body.status, notes: req.body.notes}})
        }
        sendEmail_travelAuthApproved(req.query.id, requesterTravelAuth.number, session.user.firstName, requesterTravelAuth.requestedBy.email)
        if (requesterTravelAuth.travelAdv.advance) {
            sendEmail_advDisbursementNeeded(req.query.id, requesterTravelAuth.number, requesterTravelAuth.requestedBy.firstName, TRAVEL_ADVANCE_DISBURSEMENT_EMAIL)
        }
        res.json({msg: 'Success!'})
    } catch (err) {
        console.log(err)
        res.json({err: err})
    }
}

const denyTravelAuth = async (req, res) => {
    const session = await getSession({req})
    try {
        const requesterTravelAuth = await TravelAuth.findOne({_id: req.query.id}).populate('requestedBy')
        if (req.body.role == 'manager') {
            await TravelAuth.updateOne({_id: req.query.id}, {$set: {'managerSig.signature': '', 'managerSig.date': null, status: DENIED_STATUS, notes: req.body.notes}})
        } else {
            await TravelAuth.updateOne({_id: req.query.id}, {$set: {'presidentSig.signature': '', 'presidentSig.date': null, status: DENIED_STATUS, notes: req.body.notes}})
        }
        sendEmail_travelAuthDenied(req.query.id, requesterTravelAuth.number, session.user.firstName, requesterTravelAuth.requestedBy.email)
        res.json({msg: 'Success!'})
    } catch (err) {
        console.log(err)
        res.json({err: err})
    }
}