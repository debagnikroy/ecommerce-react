import React from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import Signin from "./user/Signin";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";

import Dashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";


import Signup from "./user/Signup";
import Home from "./core/Home";

const Routes=()=>{
    return(
    <BrowserRouter>
        <Switch>
            <Route path="/signin" exact component={Signin} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
            <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
            <AdminRoute path="/create/category" exact component={AddCategory} />
        </Switch>
    </BrowserRouter>
    )
}

export default Routes;
