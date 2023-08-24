import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Drafts(){
    
    const props=JSON.parse(localStorage.getItem('object'));

    const navigate=useNavigate();
    
    const token=localStorage.getItem('jwtToken');
    console.log(token);
    const headers={'authToken':token};

    const handleCreate=()=>{
        axios.post('http://127.0.0.1:3000/create/post',props[0],{headers})
    .then((res)=>{
        console.log('Post Saved')
    })
    .catch((err)=>{
        console.log('failed posting')
    })
    localStorage.removeItem('object')
    navigate('/loggedin')  
    }

    const dateObj = new Date()
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    const handleDelete = ()=>{
        localStorage.removeItem('object');
    }
    console.log(props);

    return(
        <>
           {(props)?
      (props.map((post)=>{return(
        <div className="blog" key={post.id}>
            <div className="content">
                <div className="image_name">
                    <img className="profilepic" width="24" height="24" src={post.featured_image} />
                    <div className="name">
                        {post.author_name} . <span className="date">{formattedDate}</span>
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
                
                {/* <Link to={`/post/${post.id}/edit`}>Edit</Link> */}
                <Link onClick={()=>handleDelete(post.id)}>Delete</Link>
                <Link onClick={handleCreate}>Publish</Link>
                </div> 
            
            <img width="112" height="112" src={post.featured_image}/>
        </div>)
       } ) ):(null)}
        </>
    )
}