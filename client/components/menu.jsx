import ProductCard from "./productcard";

const Menu = ({ menu, addToCart, removeFromCart }) => {
  
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