import Link from 'next/link';
import styles from '../styles/Index.module.css';
import Menu from '../components/menu';
import { getMenu } from '../utils/menu';
import { useContext } from 'react';

export const getStaticProps = async () => {
  const menu = await getMenu();
  return {
    props: {
      menu,
    },
    revalidate: 86400,
  };
};

const Index = ({ menu }) => {
  return (
    <main>
      <div>
        {cart => <div>{cart}</div>}
        <div>Bakery Place!</div>
      </div>
      <div className={styles.dashboard}>
        <div className={styles.menu}>
          <h1>Menu</h1>
          <Menu menu={menu} />
        </div>
        <div className={styles.sidebar}>
          <Link href={'/register'}>
            <button className={styles.button}>Register</button>
          </Link>
          <Link href={'/login'}>
            <button className={styles.button}>Login</button>
          </Link>
        </div>
      </div>
    </main>
  )
}


export default Index;