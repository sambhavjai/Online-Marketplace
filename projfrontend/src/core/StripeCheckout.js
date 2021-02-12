import React, { useState } from 'react';
import { isAuthenticated } from '../auth/helper';
import {Link} from 'react-router-dom';

const StripeCheckout = ({products, setReload = f => f, reload=undefined}) => {

    const [data,setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    });

    const {user,token} = isAuthenticated();

    const getFinalAmount = () => {
        let amount =0 ;
        products.map((product,index) => {
            amount = amount + product.price;
        });
        return amount;
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
             <button className="btn btn-success">Pay With Stripe</button>
        ) : (
            <Link to="/signin" className="btn btn-outline-warning">Please Signin</Link>
        )
    }

    return (
        <div>
            <h3 className="text-white">Stripe checkout {getFinalAmount()}</h3>
            {showStripeButton()}
        </div>
    )
}

export default StripeCheckout;