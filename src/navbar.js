
import { Link } from "react-router-dom";
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Home from './home';
import Loggedin from './loggedin'

export default function Navbar(){
    const navigate=useNavigate();
    

    const token = localStorage.getItem('jwtToken');
    // const [status,setStatus] = useState(false);
    console.log(token);

    // useEffect(()=>{
    //     setStatus(!!token);
    // })
    // function handleLogout(){
    //     localStorage.removeItem('jwtToken');
    //     navigate('/');
    //     localStorage.clear();
    // }
    return(
    //     <header className="nav_logo">
    //   <Link to="/" className="logo">Medium-Clone</Link>
    //   <nav className="nav">
    //     <Link>Our story</Link>
    //     <Link>Membership</Link>
    //     <Link to='../login'>Write</Link>
    //     {token? (<Link onClick={handleLogout}>Logout</Link>) : (<Link to='../login'>Sign In</Link>)}
    //     {/* {token?null:(<Link className="get" to='../register'>Get Started</Link>)} */}
    //   </nav>
    //   </header>
    <>
    {token?(navigate('/loggedin')):(navigate('/'))}
    </>
    )
}