import React from 'react';
import {Link} from 'react-router-dom';
import Display from './display';



const Home = () => {


  return (
    
    <div className="home">
      <header className="nav_logo">
      <nav className="nav">
       
        <Link to="/" className="logo">Medium-Clone</Link>
        <div>
        <input placeholder="Enter name to Search" className="search"/>
        <button id="search">Search</button>
        
          <Link to="/Add"><button className="Publish">Publish</button></Link>
          </div>
          <ul className="nav-list">
          <li><Link to="/Login">Login</Link></li>
          <li><Link to="/Register">Register</Link></li>
          </ul>
      </nav>
      </header>
      <div className="post-list">
        <h1>Posts</h1>
        <Display />
      </div>
    </div>
  );
};

export default Home;
