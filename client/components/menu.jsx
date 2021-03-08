import { useContext, useEffect } from "react";
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
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          </div>          
        ))
      }
    </div>
  )
};

export default Menu;