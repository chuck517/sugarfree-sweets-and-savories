import React, { useState, useMemo } from 'react';

import { UserContext } from '../contexts/UserContext';
import { CartContext } from '../contexts/CartContext';
import { CartTotalContext } from '../contexts/CartTotalContext';

import '../styles/globals.css';


const MyApp = ({ Component, pageProps }) => {
  const [ userIsAuthenticated, setUserIsAuthenticated ] = useState(false);
  const [ cart, setCart ] = useState([]);
  const [ cartTotal, setCartTotal ] = useState(0);

  const addToCart = (product) => {
    console.log('Start:', cart);
    const foundItem = cart.find(item => item._id === product._id);
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
    console.log('End:', cart);
  }
  
  const removeFromCart = (product) => {
    const foundItem = cart.find(item => item._id === product._id);
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
    <UserContext.Provider value={{ userIsAuthenticated, setUserIsAuthenticated }}>
      <CartContext.Provider value={ inventory }>
        <CartTotalContext.Provider value={{ cartTotal, setCartTotal }}>
          <Component {...pageProps}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        </CartTotalContext.Provider>
      </CartContext.Provider>
    </UserContext.Provider>
  )
}

export default MyApp;
