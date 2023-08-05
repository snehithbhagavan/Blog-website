import React, { useState } from 'react';
 import {Link} from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch('https://d7fc-103-15-255-95.ngrok-free.app/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        // Successful login
        setResponse(responseData);
        // Store the token in localStorage
        localStorage.setItem('token', responseData.token);
      } else if (response.status === 401) {
        // Unauthorized
        setResponse({ error: 'Invalid credentials' });
      } else {
        // Handle other status codes if necessary
        setResponse({ error: 'Something went wrong' });
      }
    } catch (error) {
      console.error('Error:', error);
      setResponse({ error: 'Something went wrong' });
    }
  };

  return (
    <div className="login">
            
        <form onSubmit={handleSubmit} 
        className='form'>
            <h2>Login</h2>  
      
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="input"
          onChange={(e) => setEmail(e.target.value)}
        />
         
         
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="input"
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <Link to="../"><button type="submit" className="form-button" >Login</button></Link>
        <div className="form-foot">
        <p>Don't have an account? <Link to="../Register"><span>Create One</span></Link></p>
        </div>
      </form>
      
      {/*response && response.token && <p>{response.message}</p>}
      {response && response.error && <p>{response.error}</p>*/}
    </div>
  );
};

export default LoginForm;