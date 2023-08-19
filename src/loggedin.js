import React from 'react';
import './loggedin.css';
import {useState} from 'react';
import LoggedinPosts from './loggedinposts';
import SortPosts from './sort';
import FilterPosts from './filter';
import MyPosts from './myposts';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import Navbar from './navbar';

export default function Loggedin(){
    var page=null;
    const [showAll, setShowAll] = useState(true);
    const [sort,setSort] = useState(false);
    const [filter,setFilter] = useState(false);
    const [myPosts,setMyPosts] = useState(false);

    const navigate=useNavigate();
    

    if(showAll)
    page = <LoggedinPosts />
    else if(sort)
    page = <SortPosts />
    else if(filter)
    page = <FilterPosts />
    else if(myPosts)
    page = <MyPosts />
    
    function handleLogout(){
      localStorage.removeItem('jwtToken');
      console.log('yes');
      navigate('/');
      localStorage.clear();
  } 
        
        return(
        <>
       <div className="navbar">
        <div className="navbar_left">
           <div>Medium-Clone</div>
           <input type='search' placeholder='Search Medium'></input>
        </div>
        <div className="navbar_right">
           <Link to="../Add"><div className="write">Write</div></Link>
           <div className="profile"><Link to="../profile">Profile</Link></div>
           <div onClick={handleLogout}>Logout</div>
        </div> 
      </div> 
      {/* <Navbar /> */}
      <div className="filter_sort">
        <div className="show" onClick={()=>{setSort(false);setShowAll(true);setFilter(false);setMyPosts(false);}}>Show All</div>
        <div className="sort" onClick={()=>{setSort(true);setShowAll(false);setFilter(false);setMyPosts(false);}}>Sort Posts</div>
        <div className="filter" onClick={()=>{setSort(false);setShowAll(false);setFilter(true);setMyPosts(false);}}>Filter Posts</div>
        <div className="filter" onClick={()=>{setSort(false);setShowAll(false);setFilter(false);setMyPosts(true);}}>My Posts</div>
      </div>
      {page}


      
      </>
       )
    }
    
