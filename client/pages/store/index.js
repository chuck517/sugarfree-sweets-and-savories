import ProductCard from "../../components/ProductCard";
import styles from '../../styles/Menu.module.css';

const Dashboard = ({ menu, addToCart, removeFromCart }) => {
  
  return (
    <div className={styles.menuWindow}>
      {
        menu.map((product) => (
          <div key={product.id}>
            <ProductCard
              product={product}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          </div>          
        ))
      }
    </div>
  )
};

export default Dashboard;