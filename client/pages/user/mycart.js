import Link from "next/link";
import { useContext, useEffect } from "react";
import ProductCardCart from "../../components/ProductCardCart.js";
import { CartContext } from "../../contexts/CartContext";
import { UserContext } from "../../contexts/UserContext.js";
import styles from '../../styles/Cart.module.css';
import apiService from "../../utils/api.js";

const MyCart = () => {
  const { cart, setCart } = useContext(CartContext);

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
    <div>
      <h2>Your Cart</h2>
      {
        cart.map((product) => (
          <div className={styles.cartCard} key={product.id}>
            <ProductCardCart
              product={product}
            />
          </div>          
        ))
      }
      <button onClick={handleSave}>Save</button>
      <button onClick={handleClear}>Clear</button>
      <Link href='/'>
        <button>Go back</button>
      </Link>
    </div>
  )
};

export default MyCart;