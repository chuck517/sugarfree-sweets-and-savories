import { CartContext } from "../../contexts/CartContext"
import { CartTotalContext } from "../../contexts/CartTotalContext";
import apiService from "../../utils/api";

const Checkout = () => {
  const { cart, setCart } = useContext(CartContext);
  const { cartTotal, cartTotalContext } = useContext(CartTotalContext);

  const handleCheckout = async (e) => {
    e.preventDefault();
    const res = await apiService.checkout(cart, cartTotal);
    if (res.error) {
      alert(`${res.message}`);
    } else {
      console.log('CHECKOUT');
    }
  }

  return (
    <div>Placeholder</div>
  )
}

export default Checkout;