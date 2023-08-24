import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './filter.css'
import './loggedinposts.css';

//'get/post/author/:author_id'
//'/author/showAll'


export default function Filter(){
  
  const [author,setAuthor] =useState('');
  const [data,setData] =useState([]);
  const [match,setMatch] = useState();
  const [filterArray,setFilterArray] = useState([]);
  const [myPosts,setMyPosts] = useState([]);

  const token=localStorage.getItem('jwtToken')

  // var match=null;
  console.log(author);
  

  const headers={
    'authToken':token
}

 

  // useEffect(()=>{
  // axios.get('http://127.0.0.1:3000/author/showAll').then((res)=>{setData(res.data)});

  // },[]);

  
  // useEffect(()=>{
  // data.map((item)=>{
  //   if(item.name===author){ 
      
  //     setMatch(item.id)
      
  //   }
    
  // })},[author]);

  useEffect(()=>{
    axios.get('http://127.0.0.1:3000/posts/all', { headers })
    .then((response)=>{
        setMyPosts(response.data)
        console.log(myPosts)    
    })
    .catch((error)=>{
        console.log(error)
    })

    
    if(author!==''){
      setFilterArray(myPosts.filter((post)=>{
        return (post.author_name.startsWith(author) && post.author_name.includes(author))
      }))}
    else if(author===''){
      setFilterArray([])
    
      
      console.log(filterArray)
    }
    
    
},[author])






  
  
  // useEffect(()=>{
  //   axios.get(`http://127.0.0.1:3000/get/post/author/${match}`).then((res)=>setFilterArray(res.data))
  // },[author])
  
  console.log(match);

  console.log(filterArray);
  



  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
  return(
      <>

        
       <input placeholder="Enter Author Name" className="sortbox" type="text" value={author} onChange={(e)=>{setAuthor(e.target.value)}}/>

        {filterArray.map((post)=>{return(<div className="blog" key={post.id}>
            <div className="content">
                <div className="image_name">
                    <img className="profilepic" width="24" height="24" src={post.image} />
                    <div className="name">
                        {post.author_name}
                    </div>
                </div>
                <div className="ltitle">{post.title}</div>
                <div className="description"><p>
                  {post.text.substring(0,50)}
                </p>
                </div>
                <div className="bottom">
                    <div className="Topic">
                        Tech
                    </div>
                    <div className="time">
                        {formattedDate}
                    </div>
                    <Link to={`/eachpost/${post.id}`} onClick={()=>{axios.post(`http://127.0.0.1:3000/add/view/${post.id}`)}}>
                    
                      View More
                    </Link>
                </div>
            </div>
            <img width="112" height="112" src={post.image}/>
        </div>)})}
      </>
    )
}