import axios from "axios";
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import './loggedinposts.css'



export default function Sort(){

    const [myPosts,setMyPosts] = useState([]);
    const token=localStorage.getItem('jwtToken')
    const [sort,setSort] = useState('')
    // const [order,setOrder] = useState('')

    const headers={
        'authToken':token
    }
    
    useEffect(()=>{
        axios.get('http://127.0.0.1:3000/posts/all', { headers })
        .then((response)=>{
            setMyPosts(response.data)
            console.log(myPosts)
               
        })
        .catch((error)=>{
            console.log(error)
        })       
    },[sort])
 const handleSort = (e)=>{
    setSort(e.target.value);}

    const dateObj = new Date()
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    if(sort==="Sort by Number of Likes"){
        myPosts.sort((a,b)=>(b.likes_count-a.likes_count))
    }

    if(sort==="Sort by Number of Comments"){
        myPosts.sort((a,b)=>(b.comments_count-a.comments_count))
    }


    console.log(myPosts);

    
    
    return(
        <>
        <select name="sort" id="sort" className="sortbox" value={sort} onChange={handleSort}>
            <option></option>
             <option>Sort by Number of Likes</option>
             <option>Sort by Number of Comments</option>
        </select>

        {/* <select name="order" id="order" onChange={(e)=>setOrder(e.target.value)} value={order}>
            <option></option>
            <option>Ascending order</option>
            <option>Descending order</option>
        </select> */}
        
        {sort!==''?(myPosts.map((post)=>{return(
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
            
            <img width="112" height="112" src={post.image}/>
        </div>)
       } )):(null)

        }

        
        </>
      )
}