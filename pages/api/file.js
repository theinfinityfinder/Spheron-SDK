import initDB from "../../helper/initDB";
import file from  '../../models/file'

initDB()

export default async (req,res)=>{
    switch (req.method)
      {
         case "GET":
           await Getfiles(req,res)
           break
         case "POST":
           await Savefiles(req,res)   
           break
      }  
  }
  
  
  const Getfiles = async (req,res)=>{
    try{
      const files =  await file.find()
      res.status(200).json(files)
      res.json({error:0});

    }catch(err){
      console.log(err)
    }
    
  }
  
  
  const Savefiles = async (req,res)=>{
   
    const {mediaUrl} =  req.body
    try{
        if( !mediaUrl){
      return res.status(422).json({error:"Please add files"})
    }
     const product = await new file({
       mediaUrl
     }).save()
     console.log(mediaUrl);
     res.json({error:0});

    }catch(err){
      res.status(500).json({error:"internal server error"})
      console.log(err)
    }
  
  
  }