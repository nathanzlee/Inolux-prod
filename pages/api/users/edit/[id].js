import connectDB from '../../../../util/connectDB'
import User from '../../../../models/user'
import { ObjectId } from 'mongodb'

connectDB()

export default async function handler(req, res) {
    await editUser(req, res)
}

const editUser = async (req, res) => {
    try {
        const manager = new ObjectId(req.body.manager)
        await User.updateOne({_id: req.query.id}, {$set: {managers: [manager]}})
        res.json({msg: 'Success!'})
    } catch (err) {
        console.log(err)
        res.json({err: err})
    }
}