import React from 'react';
import {Link} from 'react-router-dom';
import {useState,useEffect} from 'react';
import axios from 'axios';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';

// async function apiCall(){
//   try{
//   const response = await fetch("https://52ab-180-94-34-50.ngrok-free.app/posts?page=1", {
//     method:"GET",

//   // body:JSON.stringify(values),
//   mode:'cors',
//   credentials:'include',});

//   const result=await response.json();
//   console.log("success:",result);
// }  catch(error){
//   console.log(error);
// }

// }
// apiCall();

const Home = () => {

  const navigate = useNavigate();

const [posts, setPosts] = useState([]);
const [image, setImage] = useState([]);

useEffect(() => {
  
  axios.get('http://127.0.0.1:3000/author/showAll').then((res)=>{
    setPosts(res.data)
   }).catch((err)=>console.log('Error in Show All Posts'))
  
}, []);

console.log(posts);



  return (
    
    <div className="home">
      {/* <Navbar /> */}
      <header className="nav_logo">
       <Link to="/" className="logo">Medium-Clone</Link>
      <nav className="nav">
        <Link to='./ourstory'>Our story</Link>
        <Link to='../login'>Write</Link>
        {/* {token? (<Link onClick={handleLogout}>Logout</Link>) : (<Link to='../login'>Sign In</Link>)} */}
        {/* {token?null:(<Link className="get" to='../register'>Get Started</Link>)} */}
        <Link to='../login'>Sign In</Link>
        <Link className="get" to='../register'>Get Started</Link>
        </nav>
       </header>
      <div className="mai">
        <div className="main_left">
           <h1 className="heading">Stay curious.</h1>
           <p className="tagline">Discover stories, thinking, and expertise from writers on any topic.</p>
           <button className="main_button">Start reading</button>
        </div>
        <div className="main_right">
        </div>
      </div>
      <div className="trending">
        <div className="tre">
          Trending on Medium
        </div>
        <div className="trending_posts">
          <div className="trending_post">
          <div className="order">01</div>
          <div className="content">
          <div className="flex_profile">
          <img className="himage" width="20" height="20" />
            <div>Marie</div>
            </div>
            <h3>Limbs</h3>
            <p className="date">Aug 10 . 4 min read</p>
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
          </div>
          </div>

        </div>
      </div>
      <hr className="rule"/>
      <div className="topics_posts">
      <div className="post-list">
        {/* <h1>Posts</h1> */}
        {/* <Display /> */}
        {posts.map((post)=> (<div className="post" key={post.id}>
          <div className="details">
          <div className="author">
            <img height="20" width="20" src={post.image}/>
            <div>{post.author_name}</div>
          </div>
          <div>
          <h2 className="title">{post.title}</h2>
          </div>
          <h3 className="des">
            {post.text}
          </h3>
          <div className="datetime">
            created_at . read_time . <span>topic</span>
          </div>
          </div>
          <a className="post_image"><img src={post.file_url} width="150" height="100"/></a>
        </div> ))}
      

      {/* <div className="post">
          <div className="details">
          <div className="author">
            <img height="20" width="20"/>
            <div>Scott</div>
          </div>
          <div>
          <h2 className="title">Limbs</h2>
          </div>
          <h3 className="des">
            About six years ago I started running. I was never a good athlete, and never particularly enjoyed running. But I started...
          </h3>
          <div className="datetime">
            Aug 8 . 11 min read . <span>Running</span>
          </div>
          </div>
          <a className="post_image"><img width="150" height="100"/></a>
        </div>

        <div className="post">
          <div className="details">
          <div className="author">
            <img height="20" width="20"/>
            <div>Scott</div>
          </div>
          <div>
          <h2 className="title">Limbs</h2>
          </div>
          <h3 className="des">
            About six years ago I started running. I was never a good athlete, and never particularly enjoyed running. But I started...
          </h3>
          <div className="datetime">
            Aug 8 . 11 min read . <span>Running</span>
          </div>
          </div>
          <a className="post_image"><img width="150" height="100"/></a>
        </div> */}

      </div>
      
      <div className="right">
      <div><h3>Topics</h3></div>
      
      <div className="topics">
        <div className="topic">ART</div>
        <div className="topic">LIFE</div>
        <div className="topic">FOOD</div>
        <div className="topic">TECHNOLOGY</div>
        <div className="topic">TRAVEL</div>
        <div className="topic">BOOKS</div>
        <div className="topic">SPACE</div>
        <div className="topic">SPddasdasdaasdasdaACE</div>
        <div className="topic">Programming</div>
        <div className="topic">Programming</div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Home;







// import React, { useState, useEffect } from 'react';

// const Home= () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     async function fetchPosts() {
//       try {
//         const response = await fetch('https://52ab-180-94-34-50.ngrok-free.app/posts?page=1');
//         if (response.ok) {
//           const data = await response.json();
//           setPosts(data); // Update state with fetched data
//         } else {
//           console.error('Request failed:', response.status);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     }

//     fetchPosts();
//   }, []);

//   return (
//     <div>
//       <h1>Posts</h1>
//       <ul>
//         {posts.map((post) => (
//           <li key={post.id}>
//             <h2>{post.title}</h2>
//             <p>{post.text}</p>
//             {/* <p>Author: {post.author.name}</p> */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Home;