import connectDB from '@/util/connectDB'
import User from '../../../models/user'

connectDB()

export default async function handler(req, res){
  await getUsers(req, res)
}

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate('managers')
    res.json({ data: users })
  } catch (err) {
    console.log(err)
    res.json({err: err})
  }
}