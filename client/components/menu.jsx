import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import ProductCard from "./productcard";

const Menu = ({ menu, addToCart, removeFromCart }) => {
  const { cart, setCart } = useContext(CartContext);
  return (
    <div>
      {
        menu.map((product) => (
          <div key={product.id}>
            <ProductCard
              product={product}
            />
            <button onClick={() => {
              addToCart(product);
              console.log(cart);
            }}>Add to cart</button>
            <button onClick={() => {
              removeFromCart(product);
            }}>Remove from cart</button>
            <br />
            <br />
          </div>          
        ))
      }
    </div>
  )
};

export default Menu;