
import React from 'react';
import {useFormik} from "formik";
import {signUpSchema} from './validation';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Register(){

const navigate=useNavigate();

const initialValues={
    name:"",
    email:"",
    password:"",
    // confirm_password:"",
  }

    
  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues:initialValues,
    
    validationSchema:signUpSchema,
    onSubmit: async (values,action) =>{
      // console.log(values);
      try{
        
        localStorage.clear();
        const response = await axios.post('http://127.0.0.1:3000/create/author',values);
        console.log("signup success");
        action.resetForm();
        navigate('/login')
      }
      catch(error){
        console.log(error);
      }
    }
  })
  // console.log(errors);
    return(
      <div className="register">
      <h2>Register</h2>
      <form className="form" onSubmit={handleSubmit}>
      <input
          type="text"
          placeholder="Username"
          value={values.name}
          onChange={handleChange}
          name="name"
          onBlur={handleBlur}
        />

        {errors.name && touched.name ? (<p className="error">{errors.name}</p>): null}
        
        
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

        {/* <input
          type="password"
          placeholder="Confirm Password"
          value={values.confirm_password}
          onChange={handleChange}
          name="confirm_password"
          onBlur={handleBlur}
           />

          {errors.confirm_password && touched.confirm_password ? (<p className="error">{errors.confirm_password}</p>): null} */}

          <button type="submit" className="form-button">Signup</button>
          <div className="form-foot">
            
          <p>Already have an account?<span><Link to="../login">Login</Link></span></p>
          </div>

          </form>
          
          </div>
    )
} 