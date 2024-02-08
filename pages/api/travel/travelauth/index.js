import connectDB from '../../../../util/connectDB'
import TravelAuth from '../../../../models/travelAuth'
import { getSession } from 'next-auth/react'
import { APPROVED_STATUS } from '@/util/keywords'

connectDB()

export default async function handler(req, res){
  await getTravelAuth(req, res)
}

const getTravelAuth = async (req, res) => {
  const session = await getSession({req})
  const user = session.user
  try {
    let travelAuthList = []
    const allTravelAuths = await TravelAuth.find().populate('requestedBy').populate('approveBy').populate({path: 'managerSig', populate: {path: 'user'}})
    if (session.user.level == 3) {
      // For Holton, send all travel auths
      travelAuthList = allTravelAuths
    } else if (session.user.number == 2){
      travelAuthList = allTravelAuths.filter(auth => auth.requestedBy.number == user.number || auth.approveBy.map(i => i.number).includes(user.number) || (auth.status == APPROVED_STATUS && auth.travelAdv.advance == true))
    } else {
      travelAuthList = allTravelAuths.filter(auth => auth.requestedBy.number == user.number || auth.approveBy.map(i => i.number).includes(user.number))
    }
    res.json({ data: travelAuthList })
  } catch (err) {
    console.log(err)
    res.json({err: err})
  }
}