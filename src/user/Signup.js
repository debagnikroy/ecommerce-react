import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {signup} from '../auth';
import Layout from "../core/Layout";


const Signup = () =>{
    const [values,setValues]=useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success:false
    });

    const {name,email,password,error,success}=values;

    

    
    const clickSubmit=(event)=>{
        event.preventDefault();
        signup({ name, email, password })
        .then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });          
    }

    
    const handleChange=name=>event=>{
        setValues({...values,error:false,[name]:event.target.value});
    };
    const signUpForm=()=>(
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" value={name} onChange={handleChange('name')} className="form-control"/>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" value={email} onChange={handleChange('email')} className="form-control"/>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" value={password} onChange={handleChange('password')} className="form-control"/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    )

    const showError=()=>{
        return(<div className='alert alert-danger'>{error}</div>)
    }

    const showSuccess=()=>{
        return(<div className='alert alert-info'>Sign up complete. Please <Link to="/Signin">sign in</Link> </div>);
    }

    /*const showSuccess=()=>{
        return (<div className='alert alert-info' style={{ display:success?"":"none"}}>
            Sign up accepted. Sign in.
        </div>)
    }

    const showError=()=>{
        return (<div className='alert alert-danger' style={{ display:error?"":"none"}}>
            {error}
        </div>)
    }*/

    const show=()=>{
        if(success===true)
            return showSuccess();
        if(error)
            return showError();        
    }
    
    return(
        <Layout title="Signup" description="Signup here" className="container col-md-8">
            {show()}
            {signUpForm()}
            {JSON.stringify(values)}

        </Layout>
    )
};


export default Signup;
