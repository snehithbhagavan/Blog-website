import React from 'react';


export default function Post({title,topic,image,text,dateTime,author}){

   

    return(
        <div className="post">
           <img src={image} alt="image"/>
            <h2 className="title">{title}</h2>
            <p className="text">{text}</p>
            <div>
                <span className="author">{author}</span>
                <span className="topic">{topic}</span>
            </div>
            <div className="dateTime">
                {dateTime}
            </div>
            
        </div>
    )

}