import {useEffect, useState} from 'react';
import Post from './structuringPost';

export default function Display(){
    const [posts,setPosts] = useState([]);

   

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://d7fc-103-15-255-95.ngrok-free.app/posts?page=1');
        const responseData = await response.json();
        console.log(responseData);
        console.log(responseData.posts);
        setPosts(responseData.posts);
        
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

    // For fetching useEffect(()=>) setPosts[api];

    return(
        
        
        <div className="posts">
            {
                posts.map((post)=>
                <Post 
                  key={post.id}
                  title={post.title}
                  topic={post.topic}
                  image={post.file_url}
                  text={post.text}
                  dateTime={post.created_at}
                  author={post.author.name} />
                )
                

                //sending all posts from display to filter
                
            }
        </div>
        
    )
}