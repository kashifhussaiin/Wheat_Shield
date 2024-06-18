import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "./constants";
import '../main.css';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = () => {
        setErrorMessage('');
        
      

        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long.');
            return;
        }

        const url = API_URL + '/login';
        const data = { username, password };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userId', res.data.userId);
                        setIsLogin(true);
                        navigate('/mainly');
                    }
                }
            })
            .catch((err) => {
                alert('SERVER ERR');
            });
    };

    const handleSignup = () => {
        setErrorMessage('');

        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long.');
            return;
        }

        if (!validateMobile(mobile)) {
            setErrorMessage('Please enter a valid mobile number.');
            return;
        }

        const url = API_URL + '/signup';
        const data = { username, password, email, mobile };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert(res.data.message);
                    setIsLogin(true);
                }
            })
            .catch((err) => {
                alert('SERVER ERR');
            });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateMobile = (mobile) => {
        const mobileRegex = /^[0-9]{11}$/;
        return mobileRegex.test(mobile);
    };

    return (
        <div>
            <div className="formshop">
                {isLogin ? (
                    <>
                        <h2>Login</h2>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Enter Username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Enter Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        <button className="btnn" onClick={handleLogin}>Login</button>
                        <p className="link">No account? <a href="#" onClick={() => setIsLogin(false)}>Sign up</a> here</p>
                    </>
                ) : (
                    <>
                        <h2>Sign Up</h2>
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Enter Username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                        <input 
                            type="text" 
                            name="mobile" 
                            placeholder="Enter Mobile" 
                            value={mobile} 
                            onChange={(e) => setMobile(e.target.value)} 
                        />
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Enter Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Enter Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        <button className="btnn" onClick={handleSignup}>Sign Up</button>
                        <p className="link">Have account? <a href="#" onClick={() => setIsLogin(true)}>Login</a> here</p>
                    </>
                )}
                {/* <p className="liw">Log in with</p>*/}
                <div className="icons">
                    <a href="#"><ion-icon name="logo-facebook"></ion-icon></a>
                    <a href="#"><ion-icon name="logo-instagram"></ion-icon></a>
                    <a href="#"><ion-icon name="logo-twitter"></ion-icon></a>
                    <a href="#"><ion-icon name="logo-google"></ion-icon></a>
                    <a href="#"><ion-icon name="logo-skype"></ion-icon></a>
                </div>
            </div>
        </div>
    );
};
