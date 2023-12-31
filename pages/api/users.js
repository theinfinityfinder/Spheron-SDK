import User from '../../models/user'
import Authenticated from '../../helper/Authenticated'

export default async (req,res)=>{
    switch(req.method){
        case "GET":
            await UserFetch(req,res)
            break
        case "PUT":
            await ChangeRole(req,res)  
            break   
       
    }
}

const UserFetch = Authenticated(async(req,res)=>{
    const users  = await User.find({ _id :{$ne:req.userId}}).select("-password")
     res.status(200).json(users)



})

const ChangeRole = Authenticated(async(req,res)=> {
    const{_id,role}= req.body
    const newrole = role == "user"? "admin" : "user"
    const users = await User.findOneAndUpdate(
        {_id},
    {role:newrole},
    {new:true}

    ).select("-password")
    res.status(200).json(users)


    



})