import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { UserContext } from "../../contexts/UserContext";
import apiService from "../../utils/api";
import auth from "../../utils/auth";

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
    <div>
      <h2>Are you sure that you would like to log out?</h2>
      <Link href='/'>
        <button>No</button>
      </Link>
      <button onClick={handleClick}>Yes</button>
    </div>
  );
};

export default Logout;