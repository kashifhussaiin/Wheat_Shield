import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "./constants";
import "./shop.css";
import "../main.css"
function ProductDetail() {
    const [product, setProduct] = useState();
    const [user, setUser] = useState();
    const params = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(API_URL + '/get-product/' + params.productId);
                if (response.data.product) {
                    setProduct(response.data.product);
                }
            } catch (error) {
                alert('Server Error');
            }
        };

        fetchProduct();
    }, [params.productId]);

    const handleContact = (addedBy) => {
        axios.get(API_URL + '/get-user/' + addedBy)
            .then((response) => {
                if (response.data.user) {
                    setUser(response.data.user);
                }
            })
            .catch((error) => {
                alert('Server Error');
            });
    };

    const handleDelete = () => {
        // Add code to delete the product
        // You can make a DELETE request to your backend API to delete the product
        alert('Delete button clicked');
    };

    const handleEdit = () => {
        // Add code to edit the product
        // You can navigate to the edit page or show a modal for editing the product
        alert('Edit button clicked');
    };
    

    const buttonStyle = {
        background: '#ff7200',
        color: '#ffffff',
        fontSize: '15px',
        borderRadius: '4px',
        padding: '10px 20px',
        margin: '10px',
        cursor: 'pointer',
        border: 'none',
    };

    return (
        <div className="App">
        {/* Product Details */}
        <h2 style={{ color: '#ff7200', fontSize: '30px', fontWeight: 'bold' }}>PRODUCT DETAILS</h2>
        {product && (
            <div className="d-flex justify-content-center flex-wrap">                {/* Display product cards */}
                <div className="card m-3">
                    {/* Product image */}
                    <img width="250px" height="150px" src={API_URL + '/' + product.pimage} alt="" />
                    <h2> Product Details : </h2>
                    {/* Product description */}
                    {product.pdesc}
                    <h3 className="m-2 price-text"> Rs. {product.price} /- </h3>
                    <p className="m-2"> {product.pname}  | {product.category} </p>
                    <p className="m-2 text-success"> {product.pdesc} </p>
                </div>
                <div className="card m-3">
                    <img width="250px" height="150px" src={API_URL + '/' + product.pimage2} alt="" />
                    <h2> Product Details : </h2>
                    {product.pdesc}
                    <h3 className="m-2 price-text"> Rs. {product.price} /- </h3>
                    <p className="m-2"> {product.pname}  | {product.category} </p>
                    <p className="m-2 text-success"> {product.pdesc} </p>
                </div>
    
                {/* Button container at the bottom */}
                <div className="form1">
                    {/* Show contact details button */}
                    <div className="report">
                <div className="section">
                    <div className="info">
                        <h4>CONTACT DETAILS</h4>
                        <p>
                        {/* User details */}
                    {user && user.username && <h3>{user.username}</h3>}
                    {user && user.mobile && <h3>{user.mobile}</h3>}
                    {user && user.email && <h3>{user.email}</h3>}
                    </p>
                    </div>
                   
                </div>
            </div>
                    {product.addedBy && 
                        <button style={buttonStyle} onClick={() => handleContact(product.addedBy)}>
                            SHOW CONTACT DETAILS
                        </button>}
                    {/* User details */}
                    <div className="form1">
                    <div className="report">
                <h2>CONTACT DETAILS</h2>
                <div className="section">
                    <div className="info">
                        <h4>EMAIL</h4>
                        <p>
                        {/* User details */}
                    {user && user.username && <h3>{user.username}</h3>}
                    {user && user.mobile && <h3>{user.mobile}</h3>}
                    {user && user.email && <h3>{user.email}</h3>}
                    </p>
                    </div>
                   
                </div>
            </div>
            </div>
                    {/* Delete button */}
                    <button style={buttonStyle} onClick={handleDelete}>
                        DELETE
                    </button>
                </div>
            </div>
        )}
    </div>
    
    );
}

export default ProductDetail;
