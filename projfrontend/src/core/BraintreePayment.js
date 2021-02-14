import DropIn from 'braintree-web-drop-in-react';
import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../auth/helper';
import { getToken, processPayment } from './helper/braintreeHelper';
import { emptyCart } from './helper/CartHelper';
import {createOrder} from './helper/OrderHelper';

const BraintreePayment = ({products,setReload = f => f, reload=undefined}) => {
    
    const [info,setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    });

    const {user,token} = isAuthenticated();

    const gettoken = () => {
        getToken(user._id,token).then(info => {
            //console.log("INFO",info)
            if(info.error)
            setInfo({...info,error:info.error});
            else
            {
                const clientToken = info.clientToken;
                setInfo({clientToken});
            }
        }).catch(error => console.log(error));
    
    }

    useEffect(() => {
        gettoken();
    },[]);

    const showDropIn  = () => {
        return (
           <div>
               { (info.clientToken !== null && products.length > 0) ? (
                   <div>
                       <DropIn options={{authorization : info.clientToken}} onInstance={instance => {info.instance=instance}} />
                       <button onClick={onPurchase}>Buy</button>
                   </div>
               ) : (<h3 className="test-white">Please login or add something to the cart</h3>) }
           </div>
        )
    }

    const onPurchase = () => {
        setInfo({loading: true});
        let nonce;
        let getNonce=info.instance.requestPaymentMethod().then(data => {
            nonce = data.nonce;
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getAmount()
            };
            processPayment(user._id,token,paymentData).then(response => {
                setInfo({...info,success:response.success,loading:false});
                console.log("Payment Success")
                const orderData = {
                    products: products,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount
                }
                createOrder(user._id,token,orderData);
                emptyCart(() => {
                });
                setReload(!reload);
            }).catch(error => {
                console.log(error);
                setInfo({...info,loading:false,success:false});
            })
        }).catch(error => console.log(error));

    }

    const getAmount = () => {
        let amount =0;
        products.map((product,index) => {
            amount = amount + product.price;
        });
        return amount;
    }

    return (
        <div>
            <h3 className="text-white">BrainTreePayment</h3>
            {showDropIn()}
        </div>
    )
}

export default BraintreePayment;