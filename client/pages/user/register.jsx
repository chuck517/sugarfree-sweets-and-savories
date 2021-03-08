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

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if(!(email && password && verifyPass && firstName && lastName)) {
        window.alert('Please fill out all fields');
      } else {
        if (password !== verifyPass) {
          window.alert('Passwords do not match');
        } else {
          const newUser = {
            email,
            password,
            firstName,
            lastName,
          }
          const fetchConfig = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(newUser),
          }
          await fetch(`${servUrl}/user/register`, fetchConfig);
          window.alert(`${email} has been registered!`);
          setEmail('');
          setPassword('');
          setVerifyPass('');
          setFirstName('');
          setLastName('');
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const handleVerifyPassChange = (e) => {
    setVerifyPass(e.target.value);
  }
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  }
  return (
    <div>
      <h2>This is the register page</h2>
      <form onSubmit={handleRegister} className="submit-form">
          Register new account:
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
            <div>Verify password</div>
            <input
              type="password"
              value={verifyPass}
              onChange={handleVerifyPassChange}
              className="password-field"
            />
          </div>
          <div className="firstName-container">
            <div>First Name</div>
            <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            className="firstName-field" />
          </div>
          <div className="lastName-container">
            <div>Last Name</div>
            <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            className="lastName-field" />
          </div>
          <button type="submit" className="create-button">Register</button>
        </form>
      <Link href="/">
        <button>Go back home</button>
      </Link>
    </div>
  )
}

export default Register;