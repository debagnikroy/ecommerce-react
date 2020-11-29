import React from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth'
import { Link } from 'react-router-dom';

const AdminDashboard=()=>{
    const {user: {_id,name,email,role}}=isAuthenticated(); 

    const profileUpdate=()=>{
        return(
            <div className="card">
                <h3 className="card-header">Admin Links</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/category">Create Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/product">Create Product</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminInformation=()=>{
        return(
            <div className="card mb-5">
                <h3 className="card-header">Admin Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role===1 ? 'admin' : 'registered user'}</li>
                </ul>
            </div>
        )
    }

    return (
        <Layout title="DashBoard" description="Admin Dashboard" className="container">        
            <div className="row">
                <div className="col-3">
                    {profileUpdate()}
                </div>
                <div className="col-9">
                    {adminInformation()}
                </div>  
            </div>
        </Layout>
    )  
}

export default AdminDashboard;

