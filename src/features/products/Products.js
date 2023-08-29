import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAysnc
} from './productsSlice';
import styles from './Products.css';
import { addAysnc } from '../cart/cartSlice';


export function Products() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.products)

  return (
    <div>
      <div>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(fetchAysnc())}
        >
          fetch Products
        </button> 
        {products.map((product) =>(
          <div className="card">
            <img src={product.thumbnail} alt={product.title} style={{ width: "100%" }} />
            <h1>{product.title}</h1>
            <p className="price">{product.price}</p>
            <p>{product.description}</p>
            <p><button onClick={() => dispatch(addAysnc(product))}>Add to Cart</button></p>
          </div>

        ))}
        

      </div>
    </div>
  );
}
