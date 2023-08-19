import React, { useState,useEffect } from 'react';
import './Addpost.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const PostForm = () => {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const token=localStorage.getItem('jwtToken');
  console.log(token);
  const headers={'authToken':token};

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
    
  };
  
  const topicObject={
    name:topic
  }

  useEffect(()=>{
  axios.post('http://127.0.0.1:3000/topic/create',topicObject,{headers}).then((res)=>console.log(res)).catch((err)=>console.log(err))
  },[])

   useEffect(()=>{
     axios.get('http://127.0.0.1:3000/topic/showAll').then((res)=>console.log(res))
   },[])

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]
        const formData = new FormData();
        formData.append('image', file, 'filename.jpg', { charset: 'utf-8' });

        axios.post('http://127.0.0.1:3000/upload',formData,{headers}).then((res)=>{
            setImage(res.data.file_url)
        })
        .catch((err)=>console.log('upload failed'))
        setImage(file)
  };


  const handleSubmit=()=>{
    const postdata={
        title:title,
        topic:topic,
        text:text,
        featured_image:image,
    }


    axios.post('http://127.0.0.1:3000/create/post',postdata,{headers})
    .then((res)=>{
        console.log('Post Saved')
    })
    .catch((err)=>{
        console.log('failed posting')
    })
    navigate('/loggedin')        
}


  const handleDraft = ()=>{
    const postdata={
      title:title,
      topic:topic,
      text:text,
      featured_image:image,
  }
  axios.post('http://127.0.0.1:3000/draft/create',postdata,{headers})
  .then((res)=>console.log('Post Drafted'))
  .catch((err)=>console.log(err));
  navigate('/loggedin');
  }

  return (
    <div>
      <div>
        <div className="container">
          <div>Title</div>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div className="container">
        <div>Topic</div>
          <input type="text" value={topic} onChange={handleTopicChange} />
        </div>
        <div className="container">
        <div>Text</div>
          <textarea value={text} onChange={handleTextChange} />
        </div>
        <div className="container">
          <div>Image</div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="container">
        <button className="create" type="submit" onClick={handleSubmit}>Publish</button>
        <button className="draft" type='submit'
        onClick={handleDraft}>Save as Draft</button>
      </div>
        </div>
        
    </div>
  );
};

export default PostForm;