import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/Index.module.css';
import Dashboard from './store';
import Sidebar from '../components/Sidebar';

import { getMenu } from '../utils/menu';
import auth from '../utils/auth';

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
  const { userIsAuthenticated, setUserIsAuthenticated } = useContext(UserContext);

  console.log(userIsAuthenticated);
  return (
    <main>
      <div className={styles.header}>
        <div>Bakery Place!</div>
      </div>
      <div className={styles.dashboard}>
        <div className={styles.menu}>
          <h1>Menu</h1>
          <Dashboard
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