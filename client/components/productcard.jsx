import Link from 'next/link';
import { useEffect } from 'react';

const ProductCard = ({ product, addToCart, removeFromCart }) => {  
  return (
    <div>
      <Link href={`/store/${product.id}`}>
        <div>
          <style jsx>
            {`
              font-size: 25px;
              font-weight: bolder;
              text-shadow: 0 0 5px white;
              border-radius: 15px;
              background-image: url('${product.img}');
              width: 400px;
              height: 200px;
              box-shadow: 2px 2px 5px rgba(0, 0, 0, 50%);
              cursor: pointer;
            `}
          </style>
          {product.name} - ${product.price}
        </div>
      </Link>
        <div>
          <button onClick={() => {
            addToCart(product);
          }}>Add to cart</button>
          <button onClick={() => {
            removeFromCart(product);
          }}>Remove from cart</button>
          <br />
          <br />
        </div>
      </div>
  )
}

export default ProductCard;