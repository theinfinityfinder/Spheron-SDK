import Link from 'next/link'
import { useState } from 'react'
import cookie from 'js-cookie'
import  { useRouter } from 'next/router'
const Login= () =>{

    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const router = useRouter()

    const userLogin = async(e)=>{
        e.preventDefault()
        const res = await fetch(`http://localhost:3000/api/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })

        })
      
   const res2 = await res.json()
   if(res2.error){
    M.toast({html:res2.error,classes:"red"})
   }
   else{
       alert("Login Successful")
       console.log(res2)
       cookie.set('token',res2.token)
       cookie.set('user',res2.user)
       router.push("/profile")

   }
} 
    return(

        <div className="container card center-allign">
            <h2>Login  User</h2>
            
          <form onSubmit={(e)=>userLogin(e)}>
          <input type="email" placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
          <input type="password" placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
            <button className="btn waves-effect waves-light #01579b light-blue darken-4" type="submit">login
        
          </button>
          <Link href="/Signup"> Dont have an account?
            
          </Link>
          
          </form>

        </div>
      
        )
}

export default Login