import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const servUrl = 'http://localhost:4000';

const apiService = {};

apiService.register = (user) => {
  return fetch(`${servUrl}/user/register`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

apiService.login = (user) => {
  return fetch(`${servUrl}/user/login`, {
    method: 'POST',
    credentials: 'include',
    // withCredentials: true,
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  }).then(res => res.json())
    .catch(err => console.log(err));
};

apiService.getCart = (user) => {
  console.log(user);
  return fetch(`${servUrl}/user/mycart`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  }).then(res => res.json())
    .catch(err => console.log(err));
};

apiService.clearCart = (cart) => {
  console.log(cart);
  return fetch(`${servUrl}/user/mycart/clear`, {
    method: 'PUT',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cart),
  }).then(res => res.json())
    .catch(err => console.log(err))
}

apiService.saveCart = (cart) => {
  return fetch(`${servUrl}/user/mycart/save`, {
    method: 'PUT',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cart),
  }).then(res => res.json())
    .catch(err => console.log(err))
}

apiService.checkout = (user, cart, cartTotal) => {
  return fetch(`${servUrl}/user/mycart/save`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({user, cart, cartTotal}),
  }).then(res => res.json())
    .catch(err => console.log(err))
}

apiService.logout = () => {
  return fetch(`${servUrl}/user/logout`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json())
    .catch(err => console.log(err));
};

export default apiService;