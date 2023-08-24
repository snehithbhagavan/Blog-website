import React from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './myposts.css';
import {useState,useEffect} from 'react';
import './loggedinposts.css';


export default function LoggedinPosts(){

    const [myPosts,setMyPosts]=useState([])
    const [author,setAuthor]=useState('')
    const token=localStorage.getItem('jwtToken')
    const [search,setSearch] = useState('')
    const [data,setData] = useState([])

    const {postId}=useParams()
    // console.log(postId);
    const headers={
        'authToken':token
    }
    

    useEffect(()=>{
        axios.get('http://127.0.0.1:3000/posts/all', { headers })
        .then((response)=>{
            setMyPosts(response.data)
            console.log(myPosts)
            setAuthor(response.data[0].author_name)
            console.log('Successfully fetched' + author)    
        })
        .catch((error)=>{
            console.log(error)
        })       
    },[])

    const dateObj = new Date()
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;


    useEffect(()=>{
        axios.get(`http://127.0.0.1:3000/posts/search?search=${search}`).then((res)=>setData(res.data))
      } ,[search])

    

    const handleDelete=(postId)=>{
        axios.delete(`http://127.0.0.1:3000/delete/posts/${postId}`,{headers})
        .then((res)=>{
            console.log('successfully deleted')
        })
        .catch((err)=>{
            console.log('failed to delete')
        })

        axios.get('http://127.0.0.1:3000/get/myPost', { headers })
        .then((response)=>{
            setMyPosts(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    console.log(myPosts);
    console.log(data);
    
    return(
        <>
         <input type='search' placeholder='Search Medium' onChange={(e)=>setSearch(e.target.value)} value={search} ></input>
    {(search)?(data.map((post)=>{return(
        <div className="blog" key={post.id}>
            <div className="content">
                <div className="image_name">
                    <img className="profilepic" width="24" height="24" src={post.image} />

                    <div className="name"><Link to={`../otherprofile/${post.author_id}`}>{post.author_name}</Link>
                         . <span className="date">{formattedDate}</span>
                    </div>
                 </div>
                <div className="ltitle"> {post.title} </div>
                <div className="description"><p>
                    {post.text.substring(0,50)}
                </p>
                </div>
                <div className="bottom">
                    <div className="Topic">
                        {post.topic}
                    </div>
                    <div className="time">
                        6 min read . Selected for you
                    </div>
                </div>
                
                <Link to={`/eachpost/${post.id}`} className="view_more">View More</Link>
                </div>
            
            <img width="224" height="112" src={post.image}/>
        </div>)
       })):
      (myPosts.map((post)=>{return(
        <div className="blog" key={post.id}>
            <div className="content">
                <div className="image_name">
                    <img className="profilepic" width="24" height="24" src={post.image} />

                    <div className="name"><Link to={`../otherprofile/${post.author_id}`}>{post.author_name}</Link>
                         . <span className="date">{formattedDate}</span>
                    </div>
                 </div>
                <div className="ltitle"> {post.title} </div>
                <div className="description"><p>
                    {post.text.substring(0,50)}
                </p>
                </div>
                <div className="bottom">
                    <div className="Topic">
                        {post.topic}
                    </div>
                    <div className="time">
                        6 min read . Selected for you
                    </div>
                </div>
                
                <Link to={`/eachpost/${post.id}`} className="view_more">View More</Link>
                </div>
            
            <img width="300" height="200" src={post.image}/>
        </div>)
       } ))}
       </>
       );
    
    
    
}