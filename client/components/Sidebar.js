import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/Sidebar.module.css';

const Sidebar = () => {
  const { cart, setCart } = useContext(CartContext);
  const { userIsAuthenticated, setUserIsAuthenticated } = useContext(UserContext);

  return (
    <div className={styles.sidebar}>
      <div>
        <Link href={'/user/register'}>
          <button className={styles.button}>Register</button>
        </Link>
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
        <div className={styles.cart}>In Cart:</div>
        {
          cart.map(item => (
            <div className={styles.cart} key={item._id}>{item.quantity} - {item.name}</div>
          ))
        }
      </div>
      <Link href={'/user/mycart'}>
        <button className={styles.button}>View Cart</button>
      </Link>
    </div>
  )
}

export default Sidebar;