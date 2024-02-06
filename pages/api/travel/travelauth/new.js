import connectDB from '../../../../util/connectDB'
import User from '../../../../models/user'
import TravelAuth from '../../../../models/travelAuth'
import Counter from '../../../../models/counter'
import { getSession } from 'next-auth/react'
import { sendEmail_newTravelAuth } from '../../../../util/nodemailer'
import { ObjectId } from 'mongodb'

connectDB()

export default async function handler(req, res){
    await newTravelAuth(req, res)
}

async function newTravelAuth(req, res) {
    // Create new travel auth with corresponding signature fields (international)
    // Populate approveBy field with corresponding managers based on session user
    // Add created travel auth to session user's travelAuths field
    const session = await getSession({req})
    console.log(req.body)
    try {
        const president = await User.findOne({level: 3})
        const user = await User.findOne({email: session.user.email}).populate('managers')
        let approvalFields
        if (req.body.international == 'true' && session.user.level === 1) {
            console.log("hellll nawwwww")
            approvalFields = {
                approveBy: [user.managers[0], president],
                managerSig: {
                    user: user.managers[0],
                    signature: '',
                    date: null
                },
                presidentSig: {
                    user: president,
                    signature: '',
                    date: null
                }
            }
        } else {
            console.log('helll yeaaaaa')
            approvalFields = {
                approveBy: [user.managers[0]],
                managerSig: {
                    user: user.managers[0],
                    signature: '',
                    date: null
                },
                presidentSig: null
            }
        }
        const travelAuthCounter = await Counter.findOne({name: "travel auths"})
        const newTravelAuth = new TravelAuth({
            number: travelAuthCounter.count + 1,
            ...req.body,
            requestedBy: user,
            ...approvalFields
        })
        await newTravelAuth.save()
        await User.updateOne({email: session.user.email},{$push: {travelAuths: newTravelAuth}})
        await Counter.updateOne({name: "travel auths"}, {$inc: {count: 1}})
        if (req.body.international == 'true' && session.user.level === 1) {
            await sendEmail_newTravelAuth(newTravelAuth._id, session.user.firstName, president.email)
        }

        await sendEmail_newTravelAuth(newTravelAuth._id, session.user.firstName, user.managers[0].email)
        res.json({msg: "Success!"})
    } catch (err) {
        console.log(err)
        res.json({err: err})
    }
}