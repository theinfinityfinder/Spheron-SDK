import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

const Signup= () =>{
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[role,setRole]=useState("")
    const[password,setPassword]=useState("")

    const router = useRouter()

    const userSignup =async(e)=>{
        e.preventDefault()
       const res = await fetch(`http://localhost:3000/api/signup`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                role,
                password
            })

        })

        
    const res2 =  await res.json()
    if(res2.error){
        M.toast({html:res2.error,classes:"red"})

    }
    else{
        alert("USER REGISTERED")

        router.push("/Login")
    }

    }

   
    return(
        <div className="container card center-allign">
            <h3>Registration</h3>
          <form onSubmit={(e)=>userSignup(e)}>
          <input type="text" placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          />
          <input type="email" placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
        
        <input
         type="text" placeholder="user/admin" value={role}
        onChange={(e)=>setRole(e.target.value)}/> 
                  
          
          <input type="password" placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
            <button className="btn waves-effect waves-light #01579b light-blue darken-4" type="submit">signup
        
          </button>
          <Link 
          href="/Login"><a> Already have an account?
            </a>
          </Link>
          </form>


        </div>
      
        )
}

export default Signup
