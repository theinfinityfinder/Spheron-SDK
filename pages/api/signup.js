import initDB from "../../helper/initDB";
import User from '../../models/user'
import bcrypt from 'bcryptjs'

initDB()

export default async(req,res)=>{
    const{name,email,role,password} = req.body
    try{
        if( !name || !email || !role || !password ){
            return res.status(422).json({
                error:"please fill all the fields"
            })
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(422).json({error:"user already exists with that email"})

        } 
        const hashedPassword = await bcrypt.hash(password,12)
        const newUser = await new User({
            name,
            email,
            role,
            password:hashedPassword}).save()
        console.log(newUser)
        res.status(201).json({message:"signup succes"})

    }catch(err){
        console.log(err)
    }
}