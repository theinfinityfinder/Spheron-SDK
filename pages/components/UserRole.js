import {useState,useEffect} from 'react'
import {parseCookies} from 'nookies'
function UserRole(){
  const[users,setusers] =useState([])

    const {token} = parseCookies()

    useEffect(()=>{Userfetch()},[])
    
      const Userfetch = async()=>{
        const res =  await fetch(`http://localhost:3000/api/users`,{
          headers:{
              "Authorization":token
          }
      })
      const res2 =  await res.json();
      
      console.log(res2)
      setusers(res2)
     
    }

    const rolehandler = async (_id,role)=>{
      const res =  await fetch(`http://localhost:3000/api/users`,{
          method:"PUT",
          headers:{
           "Content-Type":"application/json",
              
           "Authorization":token
          },
          body: JSON.stringify({
              _id,
              role
          }) 
      })
      const res2 = await res.json()
      
      console.log(res2)
  
     const updatedUsers =  users.map(user=>{
         if((user.role != res2.role) && (user.email == res2.email)){
             return res2
         }else{
            return user
         }
     })
     setusers(updatedUsers)
   }


    

        

  return(
    <div>
    <h3>User Roles :</h3>
    <table className='striped'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role / Change Role</th>
          <th>Email</th>
        </tr>
      </thead>

      <tbody>
        {users.map(item=>{
          return(
            <tr>
            <td>{item.name}</td>
            <td onClick ={()=>rolehandler(item._id,item.role)}>{item.role}</td>
            <td>{item.email}</td>
            </tr>
             
            )
           })} 
          
        </tbody>
      </table>
            
           
      
      </div>
    )

}

export default UserRole