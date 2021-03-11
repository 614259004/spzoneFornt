import React from 'react'
import { BrowserRouter as Router,  Switch, Route } from 'react-router-dom';
import ManageProduct from './ManageProduct';
import ManageBrand from './ManageBrand';

import ManageCategory from './ManageCategory';
import AdminSidebar from "../components/AdminSidebar";
import '../css/AdminHome.css';


function Admin() {
    return (
        <div className="admin-layout-homepage">
        
            <Router>
                <AdminSidebar />
                <Switch>
                    <Route path='/Admin/ManageProduct'  component={ManageProduct} />
                    <Route path='/Admin/ManageBrand'   component={ManageBrand} />
                    <Route path='/Admin/ManageCategory'  component={ManageCategory} />
                </Switch>
            </Router>
        </div>
    )
}

export default Admin