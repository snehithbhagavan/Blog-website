import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './filter.css'

//'get/post/author/:author_id'
//'/author/showAll'


export default function Filter(){
  
  const [filter,setFilter] = useState('author');
  const [author,setAuthor] =useState('');
  const [startDate,setStartDate] = useState(null);
  const [endDate,setEndDate] = useState(null);
  const [data,setData] =useState([]);
  const [match,setMatch] = useState();
  const [filterArray,setFilterArray] = useState([]);

  // var match=null;
  console.log(author);
  console.log(startDate);
  console.log(endDate);
  console.log(filter);

  useEffect(()=>{
  axios.get('http://127.0.0.1:3000/author/showAll').then((res)=>{setData(res.data)});

  },[]);

  // const item={name:'snehith'}
  // const auth = 'nehitha'

  // console.log(item.name.includes(auth))

  // console.log(data);
  useEffect(()=>{
  data.map((item)=>{
    if(item.name===author){ 
      
      setMatch(item.id)
      
    }
    
  })},[author]);

  // console.log(match)
  
  useEffect(()=>{
    axios.get(`http://127.0.0.1:3000/get/post/author/${match}`).then((res)=>setFilterArray(res.data))
  },[author])
  
  console.log(match);

  console.log(filterArray);
  



  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
  return(
      <>
        {/* <select onChange={(e)=> }>
          <option value="author">Filter by Author</option>
          <option value="date">Filter by Date</option>
        </select> */}
        <select name="filter" value={filter} onChange={(e)=>{setFilter(e.target.value)}}>
          <option value="author">Filter by Author</option>
          <option  value="date">Filter by Date</option>
        </select>

        {(filter==='author')?(
        <input placeholder="Enter Author Name" className="author_name" type="text" value={author} onChange={(e)=>{setAuthor(e.target.value)}}/>)
        :(<>
        <label for="start">Start Date:</label>
        <input type="date" id="start" onChange={(e)=>{setStartDate(e.target.value)}}/>
        <label for="end">End Date:</label>
        <input type="date" id="end" onChange={(e)=>{setEndDate(e.target.value)}}/>
        </>)}

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