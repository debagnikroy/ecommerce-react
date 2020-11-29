import React, { useEffect, useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {signin,authenticate,isAuthenticated} from '../auth';
import Layout from "../core/Layout";


const Signin = () =>{
    const [values,setValues]=useState({
        name:'',
        email:'',
        password:'',
        error:'',
        loading:false,
        redirectToReferrer:false 
    });

    const {email,password,error,loading,redirectToReferrer}=values;
    const {user}=isAuthenticated();

    const clickSubmit=(event)=>{
        event.preventDefault();
        setValues({...values, loading:true, error:false});
        signin({ email, password })
        .then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data,()=>{
                    setValues({
                        ...values,                        
                        redirectToReferrer: true
                    });
                })
            }
        });          
    }

    
    const handleChange=name=>event=>{
        setValues({...values,error:false,[name]:event.target.value});
    };
    const signUpForm=()=>(
        <form>           
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

    const showLoading=()=>{
        return(<div className='alert alert-info'>Loading</div>);
    }

    const redirectUser=()=>{
        if(redirectToReferrer){
            console.log(typeof(user.role));
            if(user.role==1){
                return (<Redirect to="/admin/dashboard" />)
            }
            else
                return (<Redirect to="/user/dashboard" />);
        }
        if(isAuthenticated()){
            return (<Redirect to="/" />);
        }
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
        if(loading===true)
            return showLoading();
        if(error)
            return showError();        
    }
    
    return(
        <Layout title="Signup" description="Signup here" className="container col-md-8">
            {show()}
            {signUpForm()}
            {JSON.stringify(values)}
            {redirectUser()}
        </Layout>
    )
};


export default Signin;
