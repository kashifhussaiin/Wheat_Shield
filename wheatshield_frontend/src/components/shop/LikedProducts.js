import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BsHeartFill } from 'react-icons/bs'; 
import './shop.css';
import API_URL from "./constants";




function LikedProducts() {

    const navigate = useNavigate()

    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);


    useEffect(() => {
        const url = API_URL + '/liked-products';
        let data = { userId: localStorage.getItem('userId') }
        axios.post(url, data)
            .then((res) => {
                if (res.data.products) {
                    setproducts(res.data.products);
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }, [])
    const handleLike = (productId) => {
        let userId = localStorage.getItem('userId');

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


    return (
        <div className="main">
        {/* <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />*/}
        {/*<Categories handleCategory={handleCategory} />

        <h5> SEARCH RESULTS </h5>
        <div className="d-flex justify-content-center flex-wrap">
            {cproducts && products.length > 0 &&
                cproducts.map((item, index) => {

                    return (
                        <div key={item._id} className="card m-3 ">
                            <div onClick={() => handleLike(item._id)} className="icon-con">
                            <BsHeartFill className="heart-icon" />                                </div>
                            <img width="300px" height="200px" src={API_URL + '/' + item.pimage} />

                            <p className="m-2"> {item.pname}  | {item.category} </p>
                            <h3 className="m-2 text-danger"> {item.price} </h3>
                            <p className="m-2 text-success"> {item.pdesc} </p>
                        </div>
                    )

                })}
        </div>*/}


        <h5 style={{ color: '#ff7200', fontSize: '30px', fontWeight: 'bold' }}> FAVORITES  </h5>

        <div className="d-flex justify-content-center flex-wrap">
            {products && products.length > 0 &&
                products.map((item, index) => {

                    return (
                        <div onClick={() => handleProduct(item._id)} key={item._id} className="card m-3">
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
        </div>



    </div>
    )
}

export default LikedProducts;