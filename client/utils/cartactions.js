import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const { cart, setCart } = useContext(CartContext);

export const addToCart = (product) => {
  const foundItem = cart.find(item => item.id === product.id);
  if (!foundItem) {
    product.quantity = 1;
    setCart([...cart, product]);
  } else {
    const index = cart.indexOf(foundItem);
    foundItem.quantity++;
    const updatedCart = cart;
    updatedCart[index] = foundItem;
    setCart(updatedCart);
  }
}  

export const removeFromCart = (product) => {
  const foundItem = cart.find(item => item.id === product.id);
  if (foundItem) {
    if (foundItem.quantity === 1) {
      const updatedCart = cart.filter(item => product.name !== item.name)
      setCart(updatedCart);
    } else {
      const index = cart.indexOf(foundItem);
      foundItem.quantity--;
      const updatedCart = cart;
      updatedCart[index] = foundItem;
      setCart(updatedCart);
    }
  }
}