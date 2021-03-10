import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { UserContext } from "../../contexts/UserContext";
import apiService from "../../utils/api";
import auth from "../../utils/auth";
import styles from '../../styles/loginRegister.module.css';

const Logout = () => {
  const { cart, setCart } = useContext(CartContext);
  const { userIsAuthenticated, setUserIsAuthenticated } = useContext(UserContext);
  const router = useRouter();

  const handleClick = () => {
    apiService.logout();
    handleAuth();
  };
  
  const handleAuth = () => {
    setUserIsAuthenticated(false);
    setCart([]);
    auth.logout(() => router.push('/'));
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <h2>Are you sure that you would like to log out?</h2>
        <Link href='/'>
          <button className={styles.submit} autofocus="true">No</button>
        </Link>
        <button className={styles.submit} onClick={handleClick}>Yes</button>
      </div>
    </div>
  );
};

export default Logout;