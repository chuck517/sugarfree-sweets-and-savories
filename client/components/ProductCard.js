import Link from 'next/link';
import styles from '../styles/ProductCard.module.css';

const ProductCard = ({ product, addToCart, removeFromCart }) => {  
  return (
    <div className={styles.product_card}>
      <Link href={`/store/${product.id}`}>
        <div>
          <style jsx>
            {`
              border-top-left-radius: 15px;
              border-top-right-radius: 15px;
              background-image: url('${product.img}');
              width: 475px;
              height: 250px;
            `}
          </style>
        </div>
      </Link>
        <div>
          <button
            className={styles.button}
            onClick={() => {
            addToCart(product);
          }}>Add to cart</button>
          <button
            className={styles.button}
            onClick={() => {
            removeFromCart(product);
          }}>Remove from cart</button>
          <br />
          <span className={styles.product_name}>{product.name} - ${product.price}</span>
          <br />
        </div>
      </div>
  )
}

export default ProductCard;