import React,{useState} from 'react'
import Base from '../core/Base'
import {isAuthenticated} from '../auth/helper/index'
import {Link} from 'react-router-dom'
import {updateCategory} from './helper/adminapicall'

const UpdateCategory = ({match}) => {
    const [name,setName] = useState("");
    const [error,setError] = useState(false);
    const [success,setSuccess] = useState(false);

    const {user,token} = isAuthenticated();

    const goBack = () => {
        return (
            <div className="mt-5">
                <Link className="btn btn-success mb-3" to="/admin/categories">Manage Categories</Link>
            </div>
        )
    }

    const handleChange = event => {
        setError("");
        setName(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);
        updateCategory(match.params.categoryId,user._id,token,{name}).then(data => {
            if(data.error)
            setError(data.error);
            else
            {
                setError("");
                setSuccess(true);
                setName("");
            }
        }).catch(error => console.log(error));
    }

    const successMessage = () => {
        if(success)
        {
            return (
                <h4 className="text-success">Category updated successfully</h4>
            )
        }
    }

    const warningMessage = () => {
        if(error)
        {
            return (
                <h4 className="text-danger">{error}</h4>
            )
        }
    }

    const createCategoryForm = () => {
        return (
            <form>
                <div className="form-group">
                    <p className="lead">Enter the category</p>
                    <input type="text" className="form-control my-3" autoFocus required placeholder="For ex. Summer" onChange={handleChange} value={name} />
                    <button onClick={onSubmit} className="btn btn-outline-info">Update Category</button>
                </div>
            </form>
        )
    }
    return (
        <Base title="Update category here" description="Change the name of the category" className="container bg-info p-4">
            <row className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {createCategoryForm()}
                    {goBack()}
                </div>
            </row>
        </Base>
    )
}

export default UpdateCategory;