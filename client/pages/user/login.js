import React, { useContext, useState } from 'react';
import { UserAuthorizationContext, UserNameContext } from '../../contexts/UserContext';
import { useRouter } from 'next/router';
import apiService from '../../utils/api';
import auth from '../../utils/auth';
import { CartContext } from '../../contexts/CartContext';
import styles from '../../styles/loginRegister.module.css';
import Link from 'next/link';

const initialState = {
  email: '',
  password: '',
};


const Login = () => {
  const { userName, setUserName } = useContext(UserNameContext);
  const { userIsAuthenticated, setUserIsAuthenticated } = useContext(UserAuthorizationContext);
  const { cart, setCart } = useContext(CartContext);
  const [ state, setState ] = useState(initialState);
  
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { email, password } = state;
    const user = { email, password };
    const res = await apiService.login(user);

    if (res.message) {
      alert(`${res.message}`);
      setState(initialState);
    } else {
      const name = res.firstName;
      setUserName(name);
      setUserIsAuthenticated(true);
      const { contents } = await apiService.getCart(res);
      setCart(contents);
      auth.login(() => router.push('/'));
    }
  };

  const validateForm = () => {
    return !state.email || !state.password;
  };
  return (
    <div className={styles.formContainer}>
      <h2>Login</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.formLabel}>Enter your email address:</label>
        <input
          className={styles.field}
          type="text"
          placeholder="name@host.com"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <label className={styles.formLabel}>Enter your password:</label>
        <input
          className={styles.field}        
          type="password"
          placeholder="password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <button className={styles.submit} type="submit" disabled={validateForm()}>
          &nbsp;Login&nbsp;
        </button>
        <Link href={'/'}>
          <button className={styles.submit}>
            &nbsp;Back&nbsp;
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;