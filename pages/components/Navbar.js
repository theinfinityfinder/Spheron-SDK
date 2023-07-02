import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import {parseCookies} from 'nookies'
import cookie from 'js-cookie'


export default function Navbar() {
    const router=useRouter()
    const cookieuser= parseCookies()
    const user = cookieuser.user ?  JSON.parse(cookieuser.user): ""

    function isActive(route){
        if(route=router.pathname)
        return "active"
        else ""
    }


    return(
    <nav>
    <div className="nav-wrapper #01579b light-blue darken-4">
       <Link href="/"><a className = "brand-logo left">NEXTJS Application</a></Link>
      <ul id="nav-mobile" className="right">
        {
          user ?
          <>
          <li className={isActive('/upload')}> <Link href="/upload"><a>File Upload </a></Link></li>

          <li className={isActive('/profile')}> <Link href="/profile"><a>Profile</a></Link></li>
          <li><button className="btn" onClick={()=>{
            cookie.remove('token')
            cookie.remove('user')
            
            
            router.push('/Login')
          }}><a>Logout</a></button></li>
        </>
          :
          <>
          <li className={isActive('/Login')}> <Link href="/Login"><a>Login</a></Link></li>
        <li className={isActive('/Signup')}><Link href="/Signup"><a>Signup</a></Link></li>
        </>
        }
        
      </ul>
    </div>
  </nav>
        
    )
}