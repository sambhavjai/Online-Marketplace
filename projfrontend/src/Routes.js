import React from 'react';
import {Switch,BrowserRouter,Route} from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import userDashboard from './user/UserDashBoard';
import adminDashboard from './user/AdminDashBoard';
import AddCategory from './admin/AddCategory';

export default function Routes()
{
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/signin" exact component={Signin} />
            <PrivateRoute path="/user/dashboard" exact component={userDashboard} />
            <AdminRoute path="/admin/dashboard" exact component={adminDashboard} />
            <AdminRoute path="/admin/create/category" exact component={AddCategory} />
        </Switch>
        </BrowserRouter>
    );
}