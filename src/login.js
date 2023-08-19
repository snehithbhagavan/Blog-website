

import React from 'react';
import {useFormik} from "formik";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';




export default function Login(){
   
  const signUpSchema = Yup.object({
    email: Yup.string().email("Enter valid email").required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password"),})
  

  const navigate=useNavigate();

  const initialValues={
    email:"",
    password:"",
  }
    
  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues:initialValues,
    validationSchema:signUpSchema,
    onSubmit: async (values,action) =>{
        // console.log(values);
        try{
          localStorage.clear();
          console.log(values);
          const res= await axios.post('http://127.0.0.1:3000/author/login',values);
          action.resetForm();
          const token=res.data.token;
          console.log(res.data);
          localStorage.setItem('jwtToken', token);
          navigate('/loggedin');
          // console.log(token);
          
        }
        catch(err){
          console.log(err);
          
        }
    }
  })
    return(
      <div className="login">
      <form onSubmit ={handleSubmit} className="form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          name="email"
          onBlur={handleBlur}
        />

        {errors.email && touched.email ? (<p className="error">{errors.email}</p>): null}
        
        
        <input
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          name="password"
          onBlur={handleBlur}
           />

        {errors.password && touched.password ? (<p className="error">{errors.password}</p>): null}

        <button type="submit" className="form-button" >Login</button>
         <div className="form-foot">
        <p>Don't have an account? <Link to="../Register"><span>Create One</span></Link></p>
        </div>
        </form>
          </div>
    )
} 