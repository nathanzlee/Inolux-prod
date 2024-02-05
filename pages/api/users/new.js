import connectDB from '@/util/connectDB'
import User from '../../../models/user'
import Counter from '../../../models/counter'
import { getSession } from 'next-auth/react'
import { ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'

connectDB()

export default async function handler(req, res){
    await newUser(req, res)
}

async function newUser(req, res) {
    const session = await getSession({req})
    try {
        const userCounter = await Counter.findOne({name: "users"})
        const password = req.body.firstName[0].toUpperCase() + req.body.lastName[0].toLowerCase() + (userCounter.count + 1).toString()
        const hashPass = await bcrypt.hash(password, 12)
        console.log(req.body.manager)
        const manager = new ObjectId(req.body.manager)
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName, 
            email: req.body.email,
            password: hashPass,
            level: req.body.level,
            managers: [manager],
            number: userCounter.count + 1,
            department: req.body.department
        })
        await newUser.save()
        await Counter.updateOne({name: "users"}, {$inc: {count: 1}})
        res.json({msg: 'Success!'})
    } catch (err) {
        console.log(err)
        res.json({err: err})
    }
}

const registerUser = async ({email, password}) => {
      const hashPass = await bcrypt.hash(password, 12)
      const newUser = new User({ email, password: hashPass })
      await newUser.save()
      throw new Error("Success! Check your email.");
    }