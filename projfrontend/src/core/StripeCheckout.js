import React, { useState } from 'react';
import { isAuthenticated } from '../auth/helper';
import {Link} from 'react-router-dom';
import StripeCheckoutButton from 'react-stripe-checkout';
import { API } from '../backend';

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

    const makePayment = (token) => {
        const body = {
            token,
            products
        }
        const headers = {
            "Content-Type" : "application/json"
        }
        return fetch(`${API}/stripepayment`,{
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log(response);
        }).catch(error => console.log(error));
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutButton stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY} token={makePayment} amount={getFinalAmount() * 100} name="Buy Tshirts" shippingAddress billingAddress>
                <button className="btn btn-success">Pay With Stripe</button>
             </StripeCheckoutButton>
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