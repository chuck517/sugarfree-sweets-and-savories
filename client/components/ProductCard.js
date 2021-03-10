import Link from 'next/link';
import styles from '../styles/ProductCard.module.css';

const ProductCard = ({ product, addToCart, removeFromCart }) => {  
  return (
    <div className={styles.menuCard}>
      <Link href={`/store/${product._id}`}>
        <div>
          <style jsx>
            {`
              border-top-left-radius: 15px;
              border-top-right-radius: 15px;
              background-image: url('${product.img}');
              background-size: cover;
              height: 20vh;
              min-height: 100px;
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
          <span className={styles.productName}>{product.name} - ${product.price}</span>
          <br />
        </div>
      </div>
  )
}

export default ProductCard;