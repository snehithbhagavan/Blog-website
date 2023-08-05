

import React, { useState } from "react";
import {Link} from "react-router-dom";


const RegisterForm = () =>{
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      email: email,
      password: password,

      
    };



    try {
      const response = await fetch('https://d7fc-103-15-255-95.ngrok-free.app/users/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 422) {
        
        const data = await response.json();
        setResponse(data.errors);
      } else if (response.status === 201) {
       
        const data = await response.json();
        setResponse(data);
      } else if (response.status === 400) {
        
        const data = await response.json();
        setResponse(data.errors);
      } else {
        
        setResponse("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }

  };

  return (
    <div className="register">
        <h2>Register</h2>
      <form onSubmit={handleSubmit} className="form">
        
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <Link to="../Login"><button type="submit" className="form-button">Signup</button></Link>
        <div className="form-foot">
        <p>Already have an account? <Link to='../Login'><span>Login</span></Link></p>
        </div>
      </form>
      
    </div>
  );
};

export default RegisterForm;

