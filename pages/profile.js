import {parseCookies} from 'nookies'
import UserRole from './components/UserRole'

export default function profile ({}) {
  const cookie = parseCookies()
  const user = cookie.user ?  JSON.parse(cookie.user): ""

    return (<div className="container">
              <h2>Welcome {user.name} </h2>
                <h4>Email:{user.email}</h4>
                <h4>role :{user.role}</h4>


            
  
    
    {user.role == "admin" && <UserRole />}
    </div>
    )

  }
  
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