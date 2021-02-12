import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/CartHelper';
import ImageHelper from './helper/ImageHelper';

const Card = ({product, addToCart = true, removeFromCart = true, reload=undefined , setReload = f => f}) => {
                                                                                //function(f) = {return f}
    const [redirect,setRedirect] = useState(false);

    const addtoCart = (event) => {
        addItemToCart(product,() => {
            setRedirect(true);
        })
    }

    const getARedirect = () => {
        if(redirect)
        return (<Redirect to="/cart"/>);
    }

    const cardTitle = product ? product.name : "Default Title";
    const cardDescription = product ? product.description : "Default description";
    const cardPrice = product? product.price : "Default Price";

    const showAddToCart = (addToCart) => {
        return (
            addToCart && (
                <button className="btn btn-outline-success btn-block mt-2 mb-2" onClick={addtoCart} >Add to Cart</button>
            )
        )
    }
    
    const showRemoveFromCart = (removeFromCart) => {
        return (
            removeFromCart && (
                <button className="btn btn-outline-danger btn-block mt-2 mb-2" onClick={() => {
                    removeItemFromCart(product._id);
                    setReload(!reload);
                }}>Remove from Cart</button>
            )
        )
    }

    return (
        <div className="card text-white bg-dark border border-info">
            <div className="card-header lead">
                {cardTitle}
            </div>
            <div className="card-body">
                {getARedirect()}
                <ImageHelper product={product}/>
                <p className="lead bg-success font-weight-normal text-wrap mt-1">
                    {cardDescription}
                </p>
                <p className="btn btn-success rounded btn-sm px-4">$ {cardPrice}</p>
                <div className="row">
                    <div className="col-12">
                        {showAddToCart(addToCart)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {showRemoveFromCart(removeFromCart)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;