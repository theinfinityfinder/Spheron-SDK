import initDB from "../../helper/initDB";
import User from '../../models/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


initDB()

export default async(req,res)=>{
    const{email,password} = req.body
    try{
        if(!email || !password ){
            return res.status(422).json({
                error:"please fill all the fields"
            })
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({error:"user not found"})

        } 
        
        const Matched = await bcrypt.compare(password,user.password)
            if(Matched){
               const token = jwt.sign({userID:user._id},process.env.JWT_SECRET,{
                    expiresIn:"3d"
                })
                const {name,role,email} = user 
                res.status(201).json({token, user:{name,role,email}})
            }else{
                return res.status(401).json({error:"email or password dont match"})
            }
        res.status(201).json({message:"Login success"})

    }catch(err){
        console.log(err)
    }
}