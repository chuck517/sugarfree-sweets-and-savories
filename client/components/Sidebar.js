import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

import { UserAuthorizationContext, UserNameContext } from '../contexts/UserContext';
import { CartContext } from '../contexts/CartContext';
import { CartTotalContext } from '../contexts/CartTotalContext';

import styles from '../styles/Sidebar.module.css';
import apiService from '../utils/api';

const Sidebar = () => {
  const { userName, setUserName } = useContext(UserNameContext);
  const { userIsAuthenticated, setUserIsAuthenticated } = useContext(UserAuthorizationContext);
  const { cart, setCart } = useContext(CartContext);
  const { cartTotal, setCartTotal } = useContext(CartTotalContext);

  const [ message, setMessage ] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    const res = await apiService.saveCart(cart);
    if (res.error) {
      alert(`${res.message}`);
    } else {
      console.log('SAVE')
      setMessage('Your cart has been saved!!');
    }
  }

  const handleClear = async (e) => {
    e.preventDefault();
    
    const res = await apiService.clearCart(cart);

    if (res.error) {
      alert(`${res.message}`);
    } else {
      setCart([]);
      setMessage('Your cart has been emptied!');
    }
  };
  
  useEffect(() => {
    const reducer = (accumulator, currentItem) => accumulator + currentItem.price * currentItem.quantity;
    const newCartCost = (cart.reduce(reducer, 0));
    setCartTotal(newCartCost);
  }, [cart])

  return (
    <div className={styles.sidebar}>
      <div>
        {
          !userIsAuthenticated ?
          <Link href={'/user/register'}>
            <button className={styles.button}>Register</button>
          </Link>
          :
          <h2 className={styles.welcomeMessage}>Welcome back,<br />{userName}!</h2>
        }
        {
          userIsAuthenticated ? 
          <Link href={'/user/logout'}>
            <button className={styles.button}>Logout</button>
          </Link>
          :
          <Link href={'/user/login'}>
            <button className={styles.button}>Login</button>
          </Link>
        }
      </div>
      <div className={styles.cartContainer}>
        <div className={styles.cart}>In Your Cart:</div>
        {
          cart.map(item => (
            <div className={styles.cart} key={item._id}>{item.quantity} - {item.name}</div>
          ))
        }
      </div>
      <div>Cart total: ${cartTotal}</div>
      <div className={styles.optionContainer}>
        <button
          onClick={handleSave}
          className={styles.optionButton}
          disabled={!userIsAuthenticated}
        >
          Save
        </button>
        <button
          onClick={handleClear}
          className={styles.optionButton}
          disabled={!userIsAuthenticated}
        >
          Clear
        </button>
      </div>
      <Link href={'/user/mycart/'}>
        <button className={styles.optionButton} disabled={!userIsAuthenticated}>
          Checkout
        </button>
      </Link>
      <h3>{message}</h3>
    </div>
  )
}

export default Sidebar;