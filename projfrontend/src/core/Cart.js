import React, { useEffect, useState } from 'react';
import '../styles.css'
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/CartHelper';
import StripeCheckout from './StripeCheckout';

const Cart = () =>
{

    const [products,setProducts] = useState([]);
    const [reload,setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart());
    },[reload])

    const loadItems = () => {
        return (
            <div>
                <h3 className="text-white">Load All items here</h3>
                {products.map((product,index) => {
                    return (
                        <div key={index} className="mt-1 text-center">
                            <Card product={product} removeFromCart={true} addToCart={false} setReload={setReload} reload={reload}/>
                        </div>
                    )
                })}
            </div>
        )
    }
    
    const checkout = () => {
        return (
            <div>
                <StripeCheckout products={products} setReload={setReload} />
            </div>
        )
    }

    return(
        <Base title="Welcome to your cart" description="Checkout from here">
            <div className="row">
                <div className="col-6">
                    {loadItems()}
                </div>
                <div className="col-6">
                    {checkout()}
                </div>
            </div>
        </Base>
    )
}

export default Cart;