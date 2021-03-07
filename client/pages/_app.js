import React, { useState, useMemo } from 'react';

import { CartContext } from '../contexts/CartContext';
import '../styles/globals.css';


function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    if (!cart.includes(product)) {
      product.quantity = 1;
      setCart([...cart, product]);
    } else {      
      const index = cart.indexOf(product);
      const [ itemToAdd ] = cart.filter((item) => item.id === product.id);
      itemToAdd.quantity++;
      const updatedCart = cart;
      updatedCart[index] = itemToAdd;
      setCart(updatedCart);
    }
  }  
  
  const removeFromCart = (product) => {
    if (cart.includes(product)) {
      if (product.quantity === 1) {
        const updatedCart = cart.filter((item) => product.name !== item.name)
        setCart(updatedCart);
      } else if (product.quantity > 1) {
        product.quantity--;
      }
    }
  }

  const inventory = useMemo(() => ({ cart, setCart }), [cart, setCart]);
  return (
    <CartContext.Provider value={inventory}>
      <Component {...pageProps}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    </CartContext.Provider>
  )
}

export default MyApp;
