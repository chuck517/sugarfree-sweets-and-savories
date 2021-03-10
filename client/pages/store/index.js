import ProductCard from "../../components/ProductCard";
import styles from '../../styles/Menu.module.css';

const Menu = ({ menu, addToCart, removeFromCart }) => {
  
  return (
    <div className={styles.menuContainer}>
      <h2 className={styles.menuHeader}>Welcome to my store! Here are the items currently available:</h2>
      <div className={styles.menuWindow}>
        {
          menu.map((product) => (
            <div key={product._id}>
              <ProductCard
                product={product}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            </div>          
          ))
        }
      </div>
    </div>
  )
};

export default Menu;