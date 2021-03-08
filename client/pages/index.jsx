import styles from '../styles/Index.module.css';
import Menu from '../components/menu';
import Sidebar from '../components/sidebar';

import { getMenu } from '../utils/menu';

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
      <div>
        <div>Bakery Place!</div>
      </div>
      <div className={styles.dashboard}>
        <div className={styles.menu}>
          <h1>Menu</h1>
          <Menu 
            menu={menu}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        </div>
        <Sidebar />
      </div>
    </main>
  )
}


export default Index;