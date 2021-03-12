import React from 'react'
import { BrowserRouter as Router,  Switch, Route } from 'react-router-dom';
import Product from './Product';
import Preorder from './Preorder';
import Navbar from "../components/Navbar";


function Home() {
    return (
        <>
        <Navbar />
            <Router>
                <Switch>
                    <Route path='/Product'  component={Product} />
                    <Route path='/Preorder'  component={Preorder} />
                </Switch>
            </Router>
        </>
    )
}

export default Home