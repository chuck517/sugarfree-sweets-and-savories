import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import apiService from '../../utils/api';
import auth from '../../utils/auth';

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
    <div>
      <h2>Register</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name@host.com"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={state.lastName}
          onChange={handleChange}
        />
        <button className="formSubmit" type="submit" disabled={validateForm()}>
          &nbsp;Register&nbsp;
        </button>
      </form>
    </div>
  );
};

export default Register;