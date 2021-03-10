import Menu from './store';
import Sidebar from '../components/Sidebar';
import { getMenu } from '../utils/menu';
import styles from '../styles/Index.module.css';

export const getStaticProps = async () => {
  const menu = await getMenu();
  return {
    props: {
      menu,
    },
    revalidate: 86400,
  };
};

const Index = ({ menu, addToCart, removeFromCart }) => {
  
  return (
    <main>
      <div className={styles.storeName}>BAKERY STORE</div>
      <div className={styles.dashboard}>
        <div className={styles.menu}>
          <Menu
            menu={menu}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        </div>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
      </div>
    </main>
  )
}

export default Index;