import { useContext } from 'react';
import Link from 'next/link';
import { CartContext} from '../contexts/CartContext';
import styles from '../styles/Index.module.css';

const Sidebar = () => {
  const { cart, setCart } = useContext(CartContext);
  return (
    <div className={styles.sidebar}>
      <div>
        <Link href={'/user/register'}>
          <button className={styles.button}>Register</button>
        </Link>
        <Link href={'/user/login'}>
          <button className={styles.button}>Login</button>
        </Link>
      </div>
      <div>
        <div>In Cart: </div>
        {
          cart.map((item) => (
            <div key={item.id}>{item.quantity} {item.name}</div>
          ))
        }
      </div>
    </div>
  )
}

export default Sidebar;