import connectDB from '../../../../util/connectDB'
import User from '../../../../models/user'
import { ObjectId } from 'mongodb'

connectDB()

export default async function handler(req, res) {
    await removeUser(req, res)
}

const removeUser = async (req, res) => {
    try {
        await User.deleteOne({_id: req.query.id})
        res.json({msg: 'Success!'})
    } catch (err) {
        console.log(err)
        res.json({err: err})
    }
}