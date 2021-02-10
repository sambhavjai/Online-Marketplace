import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base'
import { deleteCategory, getCategories } from './helper/adminapicall';

const ManageCategories = () => {

    const [category,setCategory] = useState([]);
    const {user,token} = isAuthenticated();

    const preload = () => {
        getCategories().then(data => {
            if(data.error)
            console.log(data.error);
            else
            setCategory(data);
        });
    }
    
    useEffect(() => {
        preload();
    },[]);

    const delCategory = (categoryId) => {
        deleteCategory(categoryId,user._id,token).then(data => {
            if(data.error)
            console.log(data.error)
            else
            preload();
        }).catch(error => console.log(error));
    }

    return (
        <Base title="Welcome to manage categories page" description="Manage all categories here" className="container bg-dark">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-white text-center mb-3">All Categories:</h2>
                </div>
            </div>
            {category && category.map((cate,index) => {
                return ( <div key={index} className="row mt-5">
                <div className="col-4">
                    <h4 className="text-white">{cate.name}</h4>
                </div>
                <div className="col-4">
                    <Link className="btn btn-success" to={`/admin/category/update/${cate._id}`}>Update</Link>
                </div>
                <div className="col-4">
                    <button className="btn btn-danger" onClick={() => {delCategory(cate._id)}}>Delete</button>
                </div>
            </div> )
            })}
            <Link className="btn btn-success text-white mt-5" to="/admin/dashboard">Admin Home</Link>
        </Base>
    )
}

export default ManageCategories;