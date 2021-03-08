import { useState } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const servUrl = 'http://localhost:4000';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPass, setVerifyPass] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if(!(email && password)) {
        window.alert('Please fill out all fields');
      } else {
        const userToVerify = {
          email,
          password,
        }
        const fetchConfig = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(userToVerify),
        }
        const response = await fetch(`${servUrl}/user/login`, fetchConfig);
        if (response.status === 401) throw new Error('Invalid email address and/or password');
        // window.alert(JSON.parse(response.body));
        window.alert('You have successfully been logged in! Welcome back.');
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      window.alert(err.message);
      console.log(err);
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  return (
    <div>
      <h2>This is the login page</h2>
      <form onSubmit={handleLogin} className="submit-form">
        Login:
        <div className="email-container">
          <div>Email</div>
          <input 
            type="text"
            value={email}
            onChange={handleEmailChange}
            className="email-field"
          />
        </div>
        <div className="password-container">
          <div>Password</div>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="password-field"
          />
        </div>
        <button type="submit" className="create-button">Login</button>
      </form>
      <Link href="/">
        <button>Go back home</button>
      </Link>
    </div>
  )
}

export default Register;