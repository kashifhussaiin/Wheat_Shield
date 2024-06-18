import React, { useState } from 'react'; // Import React
import { BrowserRouter as Router, Route,Routes } from "react-router-dom"; 
import Monitoring from "./components/Monitoring"; // Replace with your actual component file
import { ImageUpload } from "./components/home";
import {Main} from "./components/mainly";
import Navbar from "./components/nav";
import {About} from "./components/about";
import Home from './components/shop/Home';
import Login from './components/shop/Login';
import AddProduct from './components/shop/AddProduct';
import LikedProducts from './components/shop/LikedProducts';
import ProductDetail from './components/shop/ProductDetail';
import MyProducts from './components/shop/MyProducts';
import MyProfile from './components/shop/MyProfile';
import Sell from './components/Sell'
import Location from './components/location';
import { Test } from './components/shop/test';
function App() {
  
  return (
    <React.Fragment>
    
    <Router>
     
         <Navbar/>
       <Routes>
     
        <Route index element ={<Main/>} />
        <Route path="/mainly" element={<Main/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/home" element={<ImageUpload/>} />
        <Route path="/Monitoring" element={<Monitoring/>} />
        <Route path="/test" element={<Test/>} />
        <Route path="/location" element={<Location/>} />
        <Route path="/Sell" element={<Sell/>} />
        <Route path="/Sell/Home" element={<Home/>} />
        <Route path="/Sell/Login" element={<Login/>} />
        <Route path="/Sell/AddProduct" element={<AddProduct/>} />
        <Route path="/Sell/product/:productId" element={<ProductDetail/>} />
        <Route path="/Sell/LikedProduct" element={<LikedProducts/>} />
        <Route path="/Sell/MyProducts" element={<MyProducts/>} />
        <Route path="/Sell/MyProfile" element={<MyProfile/>} />



        
        </Routes>
      
    </Router>
    </React.Fragment>
  );
}

export default App;
