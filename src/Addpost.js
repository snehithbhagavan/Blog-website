import React, { useState } from 'react';


const PostForm = () => {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content_data = {
        image:image,
        post_data:{
        title: title,
        topic: topic,
        text: text,
        }
      };

    const formData = new FormData();
    
    formData.append('post_data', JSON.stringify(content_data));
    
    formData.append('image', image);

    try {
        const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found.');
      return;
    }
      const response = await fetch('https://d7fc-103-15-255-95.ngrok-free.app/posts/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Set the Bearer token in the header
        },
        body: formData,
      });

      if (response.ok) {
        console.log('Post successfully created!');
      } else {
        console.error('Post creation failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label>Topic:</label>
          <input type="text" value={topic} onChange={handleTopicChange} />
        </div>
        <div>
          <label>Text:</label>
          <textarea value={text} onChange={handleTextChange} />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default PostForm;