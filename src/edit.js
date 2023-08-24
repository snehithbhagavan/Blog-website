import React,{useState,useEffect} from "react"
import axios from 'axios' 
// import './style.css'
import { useNavigate,useParams } from "react-router-dom"

const Edit = ()=> {
    const [title, setTitle] = useState('')
    const [topic,setTopic]=useState('')
    const [text,setText]=useState('')
    const [image,setImage]=useState(null)
    const {postId}=useParams()
    const navigate=useNavigate()
    const token = localStorage.getItem('jwtToken')

    const headers={
        'authToken':token
    }

    useEffect(()=>{
        const res=axios.get(`http://127.0.0.1:3000/get/post/${postId}`).then((res)=>{
            const data=res.data
        setTitle(data.title)
        setTopic(data.topic)
        setText(data.text)
        setImage(data.image)
        })
        .catch((err)=>console.log(err))
    },[])

    const handleImage=(e)=>{
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file, 'filename.jpg', { charset: 'utf-8' });

        axios.post('http://127.0.0.1:3000/upload',formData,{headers}).then((res)=>{
        setImage(res.data.file_url);
    })
    .catch((error)=>{
        console.error(error);
    })
    }  
    const handleUpdate=()=>{
        const postdata={
            title:title,
            topic:topic,
            text:text,
            featured_image:image,
        }
        console.log(postdata);
        axios.put(`http://127.0.0.1:3000/edit/post/${postId}`, postdata,{headers})
        .then((response)=>{
            console.log(response)
        })
        .catch((error)=>{
            console.log('updation failed',error)
        })
        console.log(title,topic,text);
        navigate('/loggedin')           
    }


    return (
        <>

    <div>
        <div className="container">
          <div>Title</div>
          <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} />
        </div>
        <div className="container">
        <div>Topic</div>
          <input type="text" value={topic} onChange={(e)=>setTopic(e.target.value)} />
        </div>
        <div className="container">
        <div>Text</div>
          <textarea value={text} onChange={(e)=>setText(e.target.value)} />
        </div>
        <div className="container">
          <div>Image</div>
          <input type="file" accept="image/*" onChange={handleImage} />
        </div>
        <div className="container">
        <button className="create" onClick={handleUpdate}>Update</button>
        
      </div>
    </div>
    </>
        
    )

}

export default Edit