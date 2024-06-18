import React from 'react';
import "./main.css";
const Navbar = () => {

  return (
    
      <div className="navbar">
        <div className="icon">
          
          <h2 className="logo">WheatShield</h2>
        </div>

        <div className="menu">
          <ul>
            <li><a href="/mainly">HOME</a></li>
            
            <li><a href="/home">SERVICE</a></li>
            <li><a href="/Monitoring">Monitor</a></li>
            <li><a href="/location">Location</a></li>
            <li><a href="/Sell">Shop</a></li>
            
            
          </ul>
          
        </div>
        <div className="search">
          <input className="srch" type="search" name="" placeholder="Type To text" />
          <a href="#"> <button className="btn">Search</button></a>
        </div>
        
      </div> 
   
  );
};

export default Navbar;
