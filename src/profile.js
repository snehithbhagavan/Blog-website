import './profile.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


export default function Profile(){

    const token = localStorage.getItem('jwtToken')
    const [details,setDetails] = useState('')
    const [change,setChange] = useState('false')
    const [save,setSave] = useState([])

    const headers = {
        authToken:token,
    }
    
    useEffect(()=>{
        axios.get('http://127.0.0.1:3000/author/my/details',{headers})
        .then((res)=>{
            setDetails(res.data)
        })
        .catch((err)=>console.log(err))
    },[])

    const dateObj = new Date()
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;


    useEffect(()=>{
        axios.get('http://127.0.0.1:3000/author/savedPosts', {headers})
        .then((res)=>{
            setSave(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })},[change])

    
    console.log(details);
    console.log(save);

    return (
        <>
        <div className="flex">
        <h1 className="username">{details.name}</h1>
        <div className="e_f">
        {details.email} . 
        <span className="following"> {details.followers_count} Follower</span>
        </div>
        <h3 className="reading">Reading List</h3>

        {save.map((post)=>{return(<div className="trending_post" key={post.save_for_later_id}>
          <div className="content">
          <div className="flex_profile">
          <img className="himage" width="20" height="20" src={post.featured_image}/>
            <div>{post.author_name}</div>
            </div>
            <h3>{post.post_title}</h3>
            <p className="date">{formattedDate} . 4 min read</p>
            <div className="viewmore"><Link to={`/eachpost/${post.id}`}>View More</Link></div>
          </div>
          </div>)})}
           <div className="trending_post">
          <div className="content">
          <div className="flex_profile">
          <img className="himage" width="20" height="20" />
             <div>Marie</div>
             </div>
             <h3>Limbs</h3>
             <p className="date">{formattedDate} . 4 min read</p>
            <div className="viewmore">View More</div>
          </div>
          </div>
           </div>
          
        </>
        
    )
}