import React, { useEffect, useState,useContext } from "react"
import {useNavigate,Link } from "react-router-dom"
import axios from 'axios'
import './Eachpost.css'
import { useParams } from "react-router-dom"

 const Eachpost =()=>{ 

    const {postId} = useParams();
        
     const token=localStorage.getItem('jwtToken')
     const [eachPost,setEachPost] = useState([]);
     const [like, setLike] =useState(false);
     const [save, setSave] = useState(false);
     const [follow,setFollow] = useState(false);
     const [comment,setComment] = useState('');
     const [comments,setComments] = useState([]);

     var count = comments.length;
     

    //  const handleEachPost = ()=>{

    //  }
    const headers={
        'authToken':token
    }

     
     

    //  const handledislike=()=>{
    //     axios.delete(`http://127.0.0.1:3000/like/remove/${postId}`,{headers})
    //     .then((res)=>setLike(false))
    //     .catch((err)=>console.log(err))
    // }

     
     const handleSave = ()=>{
        axios.post(`http://127.0.0.1:3000/author/saveForLater/${postId}`, {}, { headers}).then((res)=>console.log(res.data))
        .catch((err)=>console.log(err))
        
     }

     const handleFollow = () =>{
        axios.post(`http://127.0.0.1:3000/author/follow/${eachPost.author_id}`,{},{headers})
        .then((res)=>{
            setFollow((prev)=>!prev)
        })
        .catch((err)=>console.log('error',err))
     }

     const handleComment = () => {
        if(comment!==''){
        const commentobject={
            post_id:postId,
            text:comment,
        }
        setComment('')
        // console.log(comment)
        axios.post(`http://127.0.0.1:3000/comment/create`,commentobject,{headers}).then((res)=>console.log(res)).catch((err)=>console.log(err))
        
        }}
        // console.log(comment)

        useEffect(()=>{
          axios.get(`http://127.0.0.1:3000/comment/all/${postId}`).then((res)=>setComments(res.data))
        },[comment])


     const handlelike = ()=>{
        axios.post(`http://127.0.0.1:3000/like/create/${postId}`,{},{headers}).then((res)=>setLike(true))
        .catch((err)=>console.log(err))
     }

     const handledislike = ()=>{
        axios.delete(`http://127.0.0.1:3000/like/remove/${postId}`,{headers})
        .then((res)=>setLike(false))
        .catch((err)=>console.log(err))
     }

    const dateObj = new Date()
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

     useEffect(()=>{
        axios.get(`http://127.0.0.1:3000/get/post/${postId}`)
        .then((res) => {
          setEachPost(res.data) 
          console.log(eachPost)              
        })
        .catch((error) => {
          console.error('Error fetching posts: ', error)      
        });
      } 
         
    
  , [])


    useEffect(()=>{
        axios.get(`http://127.0.0.1:3000/like/already/liked?post_id=${postId}`,{headers}).then((res)=>setLike(res.data.success))
        .catch((err)=>console.log(err))
    },[like])




    return (
        <> 
        <div className="each">
        <h1 className="title">{eachPost.title}</h1>
        <div className="image_name">
                    <img className="profilepic" src={eachPost.image} width="44" height="44" />
                    <div className="side">
                        <div className="name">
                        {eachPost.author_name} . <span className="follow" onClick={handleFollow}>{follow?'Following':'Follow'}</span>
                        </div>
                    
                    <div className="read">
                        5 min read . <span className="date">{formattedDate}</span>
                    </div>
                    </div>
        </div>
                 
        <div className="important">
            <div className="like_comment">
                {like?(<button onClick={handledislike}>Dislike</button>):(<button onClick={handlelike}>Like</button>)}
                {like?(<p>{eachPost.likes_count+1}</p>):(<p>{eachPost.likes_count}</p>)}
                
            </div>
            <div className='save'>
                <button className='saveforlater' onClick={handleSave}>Save for Later</button>
            </div>
        </div>

        <div className="image">
            <img height="500px" width="700px" src={eachPost.image}/>
        </div>

        <div className="des">
        {eachPost.text}



        </div>
        <div>
            <input type='text' onChange={(e)=>{setComment(e.target.value)}}></input>
            <button className='comment' onClick={handleComment}>Comment</button> <span> {count}</span>
        </div>
            
            {comments.map((comment)=>{return(<div className="comments" key={comment.id}>
                <div className='author'>{comment.author_name}</div>
                <div className='text'>{comment.text}</div>
            </div>)})}
        </div>     
       </>
    );

}
export default Eachpost

