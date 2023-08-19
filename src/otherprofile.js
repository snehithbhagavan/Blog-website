import './otherprofile.css'
import { useParams } from 'react-router-dom'
import {useState,useEffect} from 'react'
import axios from 'axios'


export default function OtherProfile(){

    const {profileId}=useParams()
    const [otherDetails,setOtherDetails]=useState('')
    useEffect(()=>{
       axios.get(`http://127.0.0.1:3000//author/details/${profileId}`).then((res)=>{       
        console.log(res.data)
        setOtherDetails(res.data)
        })
        .catch((err)=>console.log(err))    
    },[])
    console.log(otherDetails);

    return(
        <div className="flex">
        <div className="top">
        <h1 className="user">{otherDetails.name}</h1>
        </div>
        <div className="e_f">
        {otherDetails.email} . 
        {/* <span className="following"> 1 Following </span> */}
        <span className="followers">{otherDetails.followers_count} Followers</span>
        </div>
        <h3 className="reading">Reading List</h3>
        <div className="trending_post">
          <div className="order">01</div>
          <div className="content">
          <div className="flex_profile">
          <img className="himage" width="20" height="20" />
            <div>Marie</div>
            </div>
            <h3>Limbs</h3>
            <p className="date">Aug 10 . 4 min read</p>
            <div className="viewmore">View More</div>
          </div>
          </div>

          <div className="trending_post">
          <div className="order">01</div>
          <div className="content">
          <div className="flex_profile">
          <img className="himage" width="20" height="20" />
            <div>Marie</div>
            </div>
            <h3>Limbs</h3>
            <p className="date">Aug 10 . 4 min read</p>
            <div className="viewmore">View More</div>
          </div>
          </div>
          </div>
          
    )
}