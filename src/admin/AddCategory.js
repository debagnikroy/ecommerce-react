import React, { useState } from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth'
import { Link } from 'react-router-dom';
import {createCategory} from "./AdminApis";


const AddCategory=()=>{
    const [name,setName]=useState("");
    const [error,setError]=useState(false);
    const [success,setSuccess]=useState(false);
    
    const {_id,user,token}= isAuthenticated();
    

    const handleChange=(e)=>{
        setError(false);
        setName(e.target.value);
    }

    const showSuccess=()=>{
        if(success)
        return (<h3 className="text-success">{name} category has been created</h3>);
    }

    const showError=()=>{
        if(error)
        return (<h3 className="text-danger"> Category name has to be unique</h3>);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setError('');
        setSuccess(false);
        createCategory(user._id,token,{name})
        .then(data=>{
            if(data.error){
                setError(true);
            }
            else{
                setError('');
                setSuccess(true);
            }
        })
        .catch(e=>{
            console.log(e);
        })
    }

    const newCategoryForm=()=>{
        return (<form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" value={name} autofocus required className="form-control" onChange={handleChange} />
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>)
    }

    return (
        <Layout title="Add a new category" description={`Welcome, ${user.name}`} className="container">        
            <div className="row">            
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                </div>  
            </div>
        </Layout>
    )  

}

export default AddCategory;