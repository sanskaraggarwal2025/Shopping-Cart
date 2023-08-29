import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteAysnc,
  fetchAysnc,
  updateAsync
} from './cartSlice';
import './cart.css';



export function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const handleChange = (e, id) => {
    console.log(e.target.value);
    //thunk mai update mai ek object jata hai issliye humne id,change pe bracket lgaya
    dispatch(updateAsync({ id, change: { quantity: +e.target.value } }))
  }

  useEffect(() =>{
    dispatch(fetchAysnc())
  },[]);

  return (
    <div>
      <div>
        
        {items.map((item) =>(
         <div className='cart-item'>
          <img 
          src={item.thumbnail}alt={item.title} 
          className='img-fluid' 
          />
          <div className="description">
            <p>{item.title}</p>
            <span>{item.brand}</span>
            <strong>${item.price}</strong>
          </div>
          <div className="quantity">
            Quantity
            <select value = {item.quantity} onChange = {(e) => handleChange(e,item.id)}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <div className="close">
            <button onClick={() => dispatch(deleteAysnc(item.id))}>X</button>
          </div>
         </div>

        ))}
        

      </div>
    </div>
  );
}
