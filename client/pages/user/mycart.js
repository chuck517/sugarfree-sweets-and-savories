import Link from "next/link";
import { useContext, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import { CartTotalContext } from "../../contexts/CartTotalContext.js";
import { UserNameContext } from "../../contexts/UserContext";
import styles from '../../styles/Cart.module.css';
import apiService from "../../utils/api.js";

const MyCart = () => {
  const { userName, setUserName } = useContext(UserNameContext);
  const { cart, setCart } = useContext(CartContext);
  const { cartTotal, setCartTotal } = useContext(CartTotalContext);

  const handleSave = async (e) => {
    e.preventDefault();
    const res = await apiService.saveCart(cart);
    if (res.error) {
      alert(`${res.message}`);
    } else {
      console.log('SAVE')
    }
  }

  const handleClear = async (e) => {
    e.preventDefault();
    
    const res = await apiService.clearCart(cart);

    if (res.error) {
      alert(`${res.message}`);
    } else {
      setCart([]);
    }
  };
    
  return (
    <div className={styles.window}>
      <div className={styles.cartContainer}>
      <h2 className={styles.storeNotice}>UNFORTUNATELY DUE TO TIME CONSTRAINTS WE ARE CURRENTLY ONLY ACCEPTING CASH AS PAYMENT<br />ONLINE PAYMENT IS COMING SOON™</h2>
        <h2>{userName}'s Cart</h2>
        <div className={styles.cartViewer}>
          {
            cart.map((product) => (
              <h3
                className={styles.cartItem}
                key={product._id}
              >
                {product.quantity}x - {product.name}
              </h3>      
            ))
          }
        </div>
        <h3>Your total: ${cartTotal}</h3>
        <div className={styles.optionsContainer}>
          <button className={styles.button} onClick={handleSave}>Save</button>
          <button className={styles.button} onClick={handleClear}>Clear</button>
        </div>
        <Link href='/'>
          <button className={styles.backButton}>Go back</button>
        </Link>
        <button className={styles.checkoutButton} disabled>Checkout</button>
      </div>
    </div>
  )
};

export default MyCart;