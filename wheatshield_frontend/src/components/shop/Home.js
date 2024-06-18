import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API_URL from "./constants";
import './shop.css'
import { BsHeartFill } from 'react-icons/bs'; 
export default function Home() {

    const navigate = useNavigate()

    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [search, setsearch] = useState('');
    const [issearch, setissearch] = useState(false);

  
    useEffect(() => {
        const url = API_URL + '/get-products';
        axios.get(url)
            .then((res) => {
                if (res.data.products) {
                    setproducts(res.data.products);
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }, [])
    const [loc, setLoc] = useState(null)
    const [showOver, setshowOver] = useState(false)


    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    }
    const handlesearch = (value) => {
        setsearch(value);
    }

    const handleClick = () => {

        const url = API_URL + '/search?search=' + search + '&loc=' + localStorage.getItem('userLoc');
        axios.get(url)
            .then((res) => {
                setcproducts(res.data.products);
                setissearch(true);
            })
            .catch((err) => {
                alert('Server Err.')
            })

       

    }

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item, index) => {
            if (item.category == value) {
                return item;
            }
        })
        setcproducts(filteredProducts)
    }

    const handleLike = (productId, e) => {
        e.stopPropagation();
        let userId = localStorage.getItem('userId');

        if (!userId) {
            alert('Please Login first.')
            return;
        }

        const url = API_URL + '/like-product';
        const data = { userId, productId }
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert('Liked.')
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })

    }


    const handleProduct = (id) => {
        navigate('/Sell/product/' + id)
    }
    
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

    return (

        <div className="main"> 
           
          {/* <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />*/}
            {/*<Categories handleCategory={handleCategory} />*/}

            {issearch && cproducts &&
                <h5> SEARCH RESULTS
                    <button style={buttonStyle} onClick={() => setissearch(false)}> CLEAR </button>
                </h5>}

            {issearch && cproducts && cproducts.length == 0 && <h5> No Results Found </h5>}
            {issearch && <div className="d-flex justify-content-center flex-wrap">
                {cproducts && products.length > 0 &&
                    cproducts.map((item, index) => {

                        return (
                            <div key={item._id} className="card m-3 ">
                                <div onClick={() => handleLike(item._id)} className="icon-con">
                                <BsHeartFill className="heart-icon" />
                                </div>
                                <img width="300px" height="200px" src={API_URL + '/' + item.pimage} />

                                <p className="m-2"> {item.pname}  | {item.category} </p>
                                <h3 className="m-2 text-danger"> {item.price} </h3>
                                <p className="m-2 text-success"> {item.pdesc} </p>
                            </div>
                        )

                    })}
            </div>}

            {!issearch && <div className="d-flex justify-content-center flex-wrap">
                {products && products.length > 0 &&
                    products.map((item, index) => {

                        return (
                            <div onClick={() => handleProduct(item._id)} key={item._id} className="card m-3">
                                <div onClick={(e) => handleLike(item._id, e)} className="icon-con">
                                <BsHeartFill className="heart-icon" />
                                </div>
                                <img width="250px" height="150px" src={API_URL + '/' + item.pimage} />
                                <h3 className="m-2 price-text"> Rs. {item.price} /- </h3>
                                <p className="m-2"> {item.pname}  | {item.category} </p>
                                <p className="m-2 text-success"> {item.pdesc} </p>
                            </div>
                        )

                    })}
            </div>}

        </div>
    )
};

