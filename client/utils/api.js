import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const servUrl = 'http://localhost:4000';

const apiService = {};

apiService.register = user => {
  return fetch(`${servUrl}/user/register`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

apiService.login = user => {
  return fetch(`${servUrl}/user/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then(res => res.json())
    .catch(err => console.log(err));
};

apiService.myCart = () => {
  return fetch(`${servUrl}/mycart`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())
    .catch(err => console.log(err));
};

apiService.clearCart = () => {
  return fetch(`${servUrl}/user/mycart/clear`, {
    method: 'PUT',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())
    .catch(err => console.log(err))
}

apiService.saveCart = cart => {
  return fetch(`${servUrl}/user/mycart/save`, {
    method: 'PUT',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cart),
  }).then(res => res.json())
    .catch(err => console.log(err))
}

apiService.logout = () => {
  return fetch(`${servUrl}/logout`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())
    .catch(err => console.log(err));
};

export default apiService;