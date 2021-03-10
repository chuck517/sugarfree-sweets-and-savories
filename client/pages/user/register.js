import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import apiService from '../../utils/api';
import auth from '../../utils/auth';
import styles from '../../styles/loginRegister.module.css';

const initialState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
};

const Register = () => {
  const { userIsAuthenticated, setUserIsAuthenticated } = useContext(UserContext);
  const [state, setState] = useState(initialState);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, firstName, lastName } = state;
    const user = { email, password, firstName, lastName };
    const res = await apiService.register(user);
    
    if (res.message) {
      alert(`${res.message}`);
      setState(initialState);
    } else {
      setUserIsAuthenticated(true);
      auth.login(() => router.push('/'));
    }
  };

  const validateForm = () => {
    return (
      !(state.email && state.password && state.firstName && state.lastName)
    );
  };

  return (
    <div className={styles.formContainer}>
      <h2>Register</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.field}
          type="text"
          placeholder="name@host.com"
          name="email"
          value={state.email}
          onChange={handleChange}
          required
        />
        <input
          className={styles.field}
          type="password"
          pattern="(?=.*\d)(?=.*[a-zA-Z])(?=.*[!#$%^*]).{8,}"
          title="Must contain at least:&#10;- One number&#10;- One uppercase letter&#10;- One lowercase letter&#10;- One of '!, #, $, %, ^, *'&#10;- At least 8 or more characters"
          placeholder="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          required
        />
        <input
          className={styles.field}
          type="text"
          placeholder="First Name"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
          required
        />
        <input
          className={styles.field}
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={state.lastName}
          onChange={handleChange}
          required
        />
        <button className={styles.submit} type="submit" disabled={validateForm()}>
          &nbsp;Register&nbsp;
        </button>
      </form>
    </div>
  );
};

export default Register;