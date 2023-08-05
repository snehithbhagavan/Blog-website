import {useState,useEffect} from 'react';

/*export default function FilterPosts({posts}){
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [author,setAuthor] = useState('');
    const [date,setDate] = useState('');
    const [likes,setLikes] = useState('');
    const [comments,setComments] = useState('');
   // const [filteredby, setFilteredby] = useState("");

    //no need to fetch useEffect for fetching and posts and setting it to setPosts because taking posts from display
    
        // For filtering author,date,number of likes,number of comments
    return (
        <>
        <input placeholder="Enter author name" type="text" onChange={(e)=>setAuthor(e.target.value)}/>
        <button type="submit">Filter by author</button>
        <button type="submit">Filter by date</button>
        <button type="submit">Filter by likes</button>
        <button type="submit">Filter by comments</button>
        </>
    )


    
    

}*/

import React from 'react';
import { useFormik } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';

const FilterForm = ({ onFilter }) => {
  const formik = useFormik({
    initialValues: {
      author: '',
      startDate: null,
      endDate: null,
    },
    onSubmit: (values) => {
      onFilter(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          onChange={formik.handleChange}
          value={formik.values.author}
        />
      </div>
      <div>
        <label htmlFor="startDate">Start Date:</label>
        <DatePicker
          id="startDate"
          name="startDate"
          selected={formik.values.startDate}
          onChange={(date) => formik.setFieldValue('startDate', date)}
          maxDate={formik.values.endDate || addDays(new Date(), 0)} // Prevent selecting future dates
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date:</label>
        <DatePicker
          id="endDate"
          name="endDate"
          selected={formik.values.endDate}
          onChange={(date) => formik.setFieldValue('endDate', date)}
          minDate={formik.values.startDate || null}
          maxDate={addDays(new Date(), 0)} // Prevent selecting future dates
        />
      </div>
      <div>
        <button type="submit">Apply Filters</button>
      </div>
    </form>
  );
};

export default FilterForm;
