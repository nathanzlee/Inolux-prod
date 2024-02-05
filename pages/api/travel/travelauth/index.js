import connectDB from '../../../../util/connectDB'
import User from '../../../../models/user'
import TravelAuth from '../../../../models/travelAuth'
import { getSession } from 'next-auth/react'
import Travel from '@/pages/travel'

connectDB()

export default async function handler(req, res){
  await getTravelAuth(req, res)
}

const getTravelAuth = async (req, res) => {
  const session = await getSession({req})
  try {
    let travelAuthList = []
    if (session.user.level == 3) {
      // For Holton, send all travel auths
      travelAuthList = await TravelAuth.find().populate('requestedBy').populate('approveBy').populate({path: 'managerSig', populate: {path: 'user'}})
    } else if (session.user.number == 2) {
      // For Teh, send travel auths with travel advances and no disbursement date
      const allTravelAuths = await TravelAuth.find().populate('requestedBy').populate('approveBy').populate({path: 'managerSig', populate: {path: 'user'}})
      travelAuthList = allTravelAuths.filter(travelAuth => travelAuth.travelAdv.advance == true && travelAuth.advDisbursementDate == null)
    } else {
      // For everyone else, send travel auths that either they requested or need to approve
      const user = await User.findOne({email: session.user.email}).populate('travelAuths').populate({path: 'travelAuths', populate: {path: 'requestedBy'}}).populate({path: 'travelAuths', populate: {path: 'managerSig', populate: {path: 'user'}}})
      const travel = await TravelAuth.find().populate('requestedBy').populate('approveBy').populate({path: 'managerSig', populate: {path: 'user'}})
      
      user.travelAuths.forEach(auth => travelAuthList.push(auth))
      travel.forEach(auth => {
        if (auth.approveBy.map(i => i.number).includes(user.number)) {
          travelAuthList.push(auth)
        }
      })
    }
    res.json({ data: travelAuthList })
  } catch (err) {
    console.log(err)
    res.json({err: err})
  }
}