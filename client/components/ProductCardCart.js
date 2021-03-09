import Link from 'next/link';
import styles from '../styles/ProductCard.module.css';

const ProductCardCart = ({ product }) => {  
  return (
    <div className={styles.cartCard}>
      <Link href={`/store/${product._id}`}>
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
          <span className={styles.product_name}>{product.name} - ${product.price}</span>
          <br />
        </div>
      </div>
  )
}

export default ProductCardCart;