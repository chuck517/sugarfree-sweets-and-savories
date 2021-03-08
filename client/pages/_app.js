import React, { useState, useMemo, useEffect } from 'react';

import { CartContext, addToCart, removeFromCart } from '../contexts/CartContext';
import '../styles/globals.css';


function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState([]);
  
  const addToCart = (product) => {
    const foundItem = cart.find(item => item.id === product.id);
    if (!foundItem) {
      product.quantity = 1;
      setCart([...cart, product]);
    } else {
      const index = cart.indexOf(foundItem);
      foundItem.quantity++;
      const updatedCart = cart;
      updatedCart[index] = foundItem;
      setCart(updatedCart);
    }
  }  
  
  const removeFromCart = (product) => {
    const foundItem = cart.find(item => item.id === product.id);
    if (foundItem) {
      if (foundItem.quantity === 1) {
        const updatedCart = cart.filter(item => product.name !== item.name)
        setCart(updatedCart);
      } else {
        const index = cart.indexOf(foundItem);
        foundItem.quantity--;
        const updatedCart = cart;
        updatedCart[index] = foundItem;
        setCart(updatedCart);
      }
    }
  }

  const cartInventory = useMemo(() => ({ cart, setCart }), [cart, setCart]);
  
  return (
    <CartContext.Provider value={cartInventory}>
      <Component {...pageProps}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    </CartContext.Provider>
  )
}

export default MyApp;
