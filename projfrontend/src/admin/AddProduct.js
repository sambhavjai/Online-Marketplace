import React,{useState,useEffect} from 'react'
import { Link, Redirect } from 'react-router-dom'
import Base from '../core/Base'
import {getCategories,createProduct} from './helper/adminapicall';
import {isAuthenticated} from '../auth/helper/index'

const AddProduct = () => {

    const {user,token} = isAuthenticated();

    const [values,setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getaRedirect: false,
        formData: ""
    });

    const {name,description,price,stock,photo,categories,category,loading,error,createdProduct,getaRedirect,formData} = values;

    const preload = () => {
        getCategories().then(data => {
            if(data.error)
            setValues({...values,error : data.error})
            else {
                setValues({...values, categories: data, formData: new FormData()});
            }
        }).catch(error => console.log(error));
    }

    useEffect(() => {
        preload()
    },[])
    
    const loadingMessage = () => {
        return (
            <div className="alert alert-success mt-3" >
                <h4>Loading ...</h4>
            </div>
        )
    }
    const redirect = () => {
        if(createdProduct)
        {
            setTimeout(() => {
                setValues({...values,getaRedirect: true})
            }, 2000);
        }
    }

    const performRedirect = () => {
        if(getaRedirect)
        {
            return <Redirect to="/admin/dashboard" />
        }
    }

    const successMessage = () => {
        return (
            <div className="alert alert-success mt-3" style={{display: createdProduct? "" : "none"}}>
                <h4>{createdProduct} created successfully</h4>
            </div>
        )
    }

    const errorMessage = () => {
        return (
            <div className="alert alert-danger mt-3" style={{display: error? "" : "none"}}>
                <h4>{error}</h4>
            </div>
        )
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values,error:"",loading:true});
        createProduct(user._id,token,formData).then(data => {
            if(data.error)
            setValues({...values,error: data.error})
            else
            {
                setValues({...values,name:"",description:"",price:"",stock:"",photo:"", loading:false , createdProduct : data.name});
            }
        })
    }

    const handleChange = name =>event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value ;
        formData.set(name,value);
        setValues({...values, [name]:value});
    }

    const createProductForm = () => {
        return (
            <form>
                <span>Post Photo</span>
                <div className="form-group mb-2">
                    <label className="btn btn-success btn-block">
                        <input onChange={handleChange("photo")} type="file" name="photo" accept="image" placeholder="Choose a file" />
                    </label>
                </div>
                <div className="form-group mb-2">
                    <input onChange={handleChange("name")} name="photo" className="form-control" placeholder="name" value={name} />
                </div>
                <div className="form-group mb-2">
                    <textarea onChange={handleChange("description")} name="photo" className="form-control" placeholder="description" value={description} />
                </div>
                <div className="form-group mb-2">
                    <input onChange={handleChange("price")} type="number" className="form-control" placeholder="price" value={price} />
                </div>
                <div className="form-group mb-2">
                    <select onChange={handleChange("category")} className="form-control" placeholder="category">
                        <option>Select</option>
                        {categories && categories.map((cate,index) => {
                            return (<option key={index} value={cate._id}>{cate.name}</option>)
                        }) }
                    </select>
                </div>
                <div className="form-group mb-2">
                    <input type="number" placeholder="Quantity" onChange={handleChange("stock")} value={stock} className="form-control " />
                </div>
                <button onClick={onSubmit} className="btn btn-outline-success mb-3" type="submit">Create Product</button>
            </form>
        )
    }

    return (
        <Base title="Add product page" description="Welcome to product creation" className="container bg-info p-4">
            <div className="bg-dark text-white rounded row">
                <div className="col-md-8 offset-md-2">
                    {loading && loadingMessage()}
                    {successMessage()}
                    {errorMessage()}
                    {createProductForm()}
                    {redirect()}
                    {performRedirect()}
                </div>
            </div>
            <Link to="/admin/dashboard" className="btn bg-dark text-white btn-md mb-3 mt-3">Admin Home</Link>
        </Base>
    )
}

export default AddProduct;