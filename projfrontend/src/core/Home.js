import React, { useEffect, useState } from 'react';
import '../styles.css'
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreapicalls';

export default function Home()
{
    const [products,setProducts] = useState([]);
    const [error,setError] = useState("");

    const loadProducts = () => {
        getProducts().then(data => {
            if(data.error)
            setError(data.error);
            else
            setProducts(data);
        });
    }

    useEffect(() => {
        loadProducts();
    },[]);

    return(
        <Base title="Home Page" description="This is the home page">
            <div className="row text-center">
                {products.map((product,index) => {
                    return (
                        <div key={index} className="col-4 mb-4">
                            <Card product={product} removeFromCart={false} />
                        </div>
                    )
                })}
            </div>
        </Base>
    )
}