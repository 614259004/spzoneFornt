import React from 'react'
import { BrowserRouter as Router,  Switch, Route } from 'react-router-dom';
import Product from './Product';
import Preorder from './Preorder';
import ProductInfo from './ProductInfo';
import Navbar from "../components/Navbar";
import Cart from './Cart';
import Payment from './Payment';


function Home() {
    return (
        <>
        <Navbar />
            <Router>
                <Switch>
                    <Route path='/Home/Product'  component={Product} />
                    <Route path='/Home/Preorder'  component={Preorder} />
                    <Route path='/Home/ProductInfo'  component={ProductInfo} />
                    <Route path='/Home/Cart'   component={Cart}/> 
                    <Route path='/Home/Payment'   component={Payment}/>  
                </Switch>
            </Router>
        </>
    )
}

export default Home