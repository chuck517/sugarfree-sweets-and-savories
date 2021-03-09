import React, { useState, useMemo, useEffect, useContext } from 'react';

import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';
import '../styles/globals.css';


const MyApp = ({ Component, pageProps }) => {
  const [cart, setCart] = useState([]);
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);

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
      setCart([...updatedCart]);
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
        setCart([...updatedCart]);
      }
    }
  }

  const inventory = useMemo(() => ({ cart, setCart }), [cart, setCart]);
  
  return (
    <UserContext.Provider value={{userIsAuthenticated, setUserIsAuthenticated}}>
      <CartContext.Provider value={inventory}>
        <Component {...pageProps}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      </CartContext.Provider>
    </UserContext.Provider>
  )
}

export default MyApp;
