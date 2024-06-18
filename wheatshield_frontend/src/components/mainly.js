import React from 'react';
import './main.css'; // actual path to stylesheet

export const Main = () => {
  return (
      <div className="content" >
        
        <h1>WheatShield<br /><span> Defend Your Harvest</span> <br />Artificial Intelligence</h1>
        <br/>
        <br/>
        <p className="par">Revolutionizing wheat farming with advanced machine learning.<br/>
         Detect and manage wheat leaf diseases with real-time image analysis,<br/> 
         empowering agriculture professionals for higher yields and sustainable practices
                <br /> Join us in pioneering a future  with WheatLeaf Health.</p>

        <button className="cn"><a href="/Sell">JOIN US</a></button>
        
       {/* <div className="form">
          <h2>Login Here</h2>
          <input type="email" name="email" placeholder="Enter Email Here" />
          <input type="password" name="" placeholder="Enter Password Here" />
          <button className="btnn"><a href="#">Login</a></button>

          <p className="link">Don't have an account<br />
            <a href="#">Sign up </a> here</p>
          <p className="liw">Log in with</p>
          <div className="icons">
            <a href="#"><ion-icon name="logo-facebook"></ion-icon></a>
            <a href="#"><ion-icon name="logo-instagram"></ion-icon></a>
            <a href="#"><ion-icon name="logo-twitter"></ion-icon></a>
            <a href="#"><ion-icon name="logo-google"></ion-icon></a>
            <a href="#"><ion-icon name="logo-skype"></ion-icon></a>
          </div>
  </div> */}
      </div>);};
