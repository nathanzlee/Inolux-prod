import connectDB from '../../../../../util/connectDB'
import TravelAuth from '../../../../../models/travelAuth'
import { PENDING_STATUS, DENIED_STATUS } from '@/util/keywords'
import { sendEmail_travelAuthRevised } from '@/util/nodemailer'
import { getSession } from 'next-auth/react'

connectDB()

export default async function handler(req, res) {
    await editTravelAuth(req, res)
}

const editTravelAuth = async (req, res) => {
    const session = await getSession({req})
    try {
        const travelAuth = await TravelAuth.findOne({_id: req.query.id}).populate('approveBy')
        if (travelAuth.status == DENIED_STATUS) {
            await TravelAuth.updateOne({_id: req.query.id}, {$set: {status: PENDING_STATUS, revisionDate: new Date(Date.now())}})
            travelAuth.approveBy.forEach(manager => {
                sendEmail_travelAuthRevised(req.query.id, travelAuth.number, session.user.firstName, manager.email)
            })
        }
        await TravelAuth.updateOne({_id: req.query.id}, {$set: {...req.body}})
        res.json({msg: 'Success!'})
    } catch (err) {
        console.log(err)
        res.json({err: err})
    }
}