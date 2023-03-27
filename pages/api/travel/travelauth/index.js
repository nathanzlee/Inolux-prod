import connectDB from '../../../../util/connectDB'
import User from '../../../../models/user'
import TravelAuth from '../../../../models/travelAuth'
import { getSession } from 'next-auth/react'

connectDB()

export default async function handler(req, res){
  switch(req.method){
    case "POST":
      await createTodo(req, res)
      break;
    case "GET":
      await getTravelAuth(req, res)
      break;
  }
}

const createTodo = async (req, res) => {
  try {
    const session = await getSession({req})
    if(!session){
      return res.status(400).json({msg: "Invalid Authentication!"}) 
    }

    const { userId } = session
    const { todo } = req.body

    if(!todo)
      return res.status(400).json({msg: "Please add todo."}) 
    
    const newTodo = new Todos({
      name: todo.toLowerCase(),
      user: userId
    })

    await newTodo.save()
    res.json({msg: 'Success! Create a new todo.'})
  } catch (err) {
    return res.status(500).json({msg: err.message})
  }
}

const getTravelAuth = async (req, res) => {
  const session = await getSession({req})
  try {
    const user = await User.findOne({email: session.user.email}).populate('travelAuths').populate({path: 'travelAuths', populate: {path: 'managerSig', populate: {path: 'user'}}})
    const travel = await TravelAuth.find().populate('approveBy').populate({path: 'managerSig', populate: {path: 'user'}})
    let travelAuthList = []
    user.travelAuths.forEach(auth => travelAuthList.push(auth))
    travel.forEach(auth => {
      if (auth.approveBy.map(i => i.number).includes(user.number)) {
        travelAuthList.push(auth)
      }
    })
    res.json({ data: travelAuthList })
  } catch (err) {
    console.log(err)
    res.json({err: err})
  }
}