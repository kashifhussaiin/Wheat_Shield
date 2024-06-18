import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from './shop/Home';
import LikedProducts from './shop/LikedProducts';
import AddProduct from "./shop/AddProduct";
import MyProducts from './shop/MyProducts';
import Login from './shop/Login';
import { useNavigate } from "react-router-dom";

export default function Sell() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeComponent, setActiveComponent] = useState(null);

    // Function to handle login
    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    // Function to handle logout
    const handleLogout = () => {
        setIsLoggedIn(false);
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        // Redirect or navigate to the login page
        navigate('/Sell');
    };

    const buttonStyle = {
        background: '#ff7200',
        color: '#ffffff',
        fontSize: '18px',
        borderRadius: '12px',
        padding: '3px 33px', // Adjust padding for button size
        margin: '5px 33px', // Add margin around the buttons (5px top/bottom, 10px left/right)
        cursor: 'pointer',
        transition: 'background-color 0.3s ease', // Add transition for smooth hover effect
        alignSelf: 'center', // Align the buttons vertically to the center 
        border: 'none',  
      };
    

    // Render components based on active component
    const renderComponent = () => {
        switch (activeComponent) {
            case "Home":
                return <Home />;
            case "LikedProducts":
                return <LikedProducts />;
            case "MyProducts":
                return <MyProducts />;
            case "AddProduct":
                return <AddProduct />;
            default:
                return <Home />;
        }
    };

    // Check login status when component mounts and update isLoggedIn state
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token && userId) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    // Render login component if user is not logged in
    if (!isLoggedIn) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div >
            <div>
                <button style={buttonStyle} onClick={() => setActiveComponent("Home")}>Home</button>
                <button style={buttonStyle} onClick={() => setActiveComponent("LikedProducts")}>Favorite</button>
                <button style={buttonStyle} onClick={() => setActiveComponent("MyProducts")}>Profile</button>
                <button style={buttonStyle} onClick={() => setActiveComponent("AddProduct")}>Add Product</button>
                <button style={buttonStyle} onClick={handleLogout}>Log Out</button>
            </div>
            {renderComponent()}
        </div>
    );
}
