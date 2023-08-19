import './myeachpost.css'
import './Eachpost.css'
import axios from 'axios'
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'



const MyEachPost= () =>{

    const {postId} = useParams();
        
    const token=localStorage.getItem('jwtToken')
    const [eachPost,setEachPost] = useState([]);
    const [like, setLike] =useState(false);
    const [save, setSave] = useState(false);
    const [follow,setFollow] = useState(false);
    

   
   const headers={
       'authToken':token
   }

    
    // const handleLikes = ()=>{
    //    axios.post(`http://127.0.0.1:3000/like/create/${postId}`,{},{headers}).then
    //    (res=>setLike(!like)).catch((error)=>console.log(error))
    // }


    
    // const handleSave = ()=>{
    //    axios.post(`http://127.0.0.1:3000/author/saveForLater/${postId}`, {}, { headers}).then((res)=>setSave(false))
    //    .catch((err)=>console.log(err))
       
    // }

    const handleFollow = () =>{
       axios.post(`http://127.0.0.1:3000/author/follow/${eachPost.author_id}`,{},{headers})
       .then((res)=>{
           setFollow(!follow)
       })
       .catch((err)=>console.log('error',err))
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
                <img className="profilepic" width="44" height="44" src={eachPost.image}/>
                <div className="side">
                    <div className="name">
                    {eachPost.author_name} . <span className="follow" onClick={handleFollow}>{follow?'Follow':'Following'}</span>
                    </div>
                
                <div className="read">
                    5 min read . <span className="date">{formattedDate}</span>
                </div>
                </div>
    </div>
             
    <div className="important">
        <div className="like_comment">
            {/* <button className='like'>Like</button>
            <span className="count_likes"></span>
            <button className='comment'>Comment</button>
            <span className='count_comments'></span>
        </div>
        <div className='save'>
            
            <button className='saveforlater'>Save for Later</button> */}
        </div>
    </div>

    <div className="image">
        <img height="500px" width="700px" src={eachPost.image}/>
    </div>

    <div className="des">
    {eachPost.title}
    </div>
        
    </div>     
   </>
);

}
export default MyEachPost
