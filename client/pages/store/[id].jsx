import Link from 'next/link';
import Sidebar from '../../components/sidebar';
import { getProductById, getMenu } from '../../utils/menu';
import styles from '../../styles/Product.module.css';

const ProductPage = ({ product }) => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboard}>
        <div className={styles.productContainer}>
          <h1 className={styles.productHeader}>{product.name}</h1>
          <div className={styles.descriptionContainer}>
            <div className={styles.detailsContainer}>
              <img className={styles.productImage} src={product.img} />
                <div className={styles.infoContainer}>
                  <p className={styles.description}>{product.description}</p>
                  <div className={styles.nutritionContainer}>
                    <small>Nutritional Information: {product.nutrition}</small><br />
                    <small>Ingredients: {product.ingredients}</small>
                  </div>
                </div>
            </div>
          </div>
          <div className={styles.buttonRow}>
            <Link href={'/'}>
              <button className={styles.backButton}>Back to homepage</button>
            </Link>
            <div>
              <button>+</button>
              <button>-</button>
            </div>
          </div>
        </div>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async ({ params }) => {
  const product = await getProductById(params.id);
  return {
    props: {
      product,
    },
    revalidate: 86400,
  };
};

export const getStaticPaths = async () => {
  const menu = await getMenu();
  return {
    paths: menu.map((product) => ({
      params: {
        id: product._id.toString(),
      },
    })),
    fallback: false,
  };
};

export default ProductPage;