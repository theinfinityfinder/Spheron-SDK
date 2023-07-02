
import {parseCookies} from 'nookies'
import { useState } from "react"
import { useRouter } from 'next/router'

const upload = ()=>{
    const [media,setMedia]=useState("")

    const router = useRouter()
    const handleSubmit=  async (e)=>{ 
      e.preventDefault()
      try{
        const mediaUrl =  await imageUpload()

        const res =  await fetch(`http://localhost:3000/api/file`,{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            
            mediaUrl,
          })
        })
        const res2 = await res.json()
        if(res2.error){
          alert("ERROR    message: {res2.error}")
        }else{
          alert("File Uploaded")
          router.push("/profile")
        }
        
        
     }catch(err){
       console.log(err)
     }

 }

const imageUpload = async ()=>{
      const data =  new FormData()
      data.append('file',media)
      data.append('upload_preset',"nextApp")
      data.append('cloud_name',"cnq")
      const res = await fetch("https://api.cloudinary.com/v1_1/dl0ock2le/image/upload",{
        method:"POST",
        body:data
      })
      const res2  = await res.json()
      return res2.url
    
      
      
 }

    return(

        <form  container = "container" onSubmit={(e)=>handleSubmit(e)}>
            <div className="file-field input-field">
      <div className="btn">
        <span>File</span>
        <input type="file" 
          accept = "image/* "
          onChange ={(e)=> setMedia(e.target.files[0])}
        />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" placeholder="Upload file"/>
      </div>
    </div>
    <img className="responsive-img " src = {media?URL.createObjectURL(media):""}/>
    <button className="btn waves-effect waves-light #01579b light-blue darken-4" type="submit">Submit 
        
          </button>
          
            </form>
    )
    
    }

    export default upload 


    export async function getServerSideProps(ctx){
      const {token}= parseCookies(ctx)
      
      if(!token ){
        const {res} = ctx
        res.writeHead(302,{Location:'/Login'})
        res.end()
      }
    
    return{
      props:{}
     }
    }