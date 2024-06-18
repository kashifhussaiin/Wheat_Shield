import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API_URL from "./constants";
import "./shop.css"
function AddProduct() {

    const navigate = useNavigate();
    const [pname, setpname] = useState('');
    const [pdesc, setpdesc] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState('');
    const [pimage, setpimage] = useState('');
    const [pimage2, setpimage2] = useState('');
    let categories = [    'Local Red Wheat',
    'Sehore-2006',
    'Punjab-2011',
    'Zincol-2016']

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])

    const handleApi = () => {

        navigator.geolocation.getCurrentPosition((position) => {
            const formData = new FormData();
            formData.append('plat', position.coords.latitude)
            formData.append('plong', position.coords.longitude)
            formData.append('pname', pname)
            formData.append('pdesc', pdesc)
            formData.append('price', price)
            formData.append('category', category)
            formData.append('pimage', pimage)
            formData.append('pimage2', pimage2)
            formData.append('userId', localStorage.getItem('userId'))

            const url =  API_URL + '/add-product';
            axios.post(url, formData)
                .then((res) => {
                    if (res.data.message) {
                        alert(res.data.message); 
                        navigate('/')
                    }
                })
                .catch((err) => {
                    alert('server err')
                })
        })



    }
    return (
        <div className='main'>
          <div className="container mt-3">
            <h1 style={{ color: '#ff7200', fontSize: '30px', fontWeight: 'bold', marginBottom: '20px' }}>ADD PRODUCT HERE:</h1>
            <div className="form-group">
              <label htmlFor="productName" style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Product Name</label>
              <input className="form-control" type="text" id="productName" value={pname} onChange={(e) => setpname(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="productDesc" style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Product Description</label>
              <input className="form-control" type="text" id="productDesc" value={pdesc} onChange={(e) => setpdesc(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="productPrice" style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Product Price</label>
              <input className="form-control" type="text" id="productPrice" value={price} onChange={(e) => setprice(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="productCategory" style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Product Category</label>
              <select className="form-control" id="productCategory" value={category} onChange={(e) => setcategory(e.target.value)}>
                <option value="">Select Category</option>
                {categories.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="productImage" style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Product Image</label>
              <input className="form-control" type="file" id="productImage" onChange={(e) => setpimage(e.target.files[0])} />
            </div>
            <div className="form-group">
              <label htmlFor="productImage2" style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Product Second Image</label>
              <input className="form-control" type="file" id="productImage2" onChange={(e) => setpimage2(e.target.files[0])} />
            </div>
            <button className="btn btn-primary mt-3" onClick={handleApi} style={{ fontSize: '14px', fontWeight: 'bold' }}>SUBMIT</button>
          </div>
        </div>
      );
      
    
}

export default AddProduct;