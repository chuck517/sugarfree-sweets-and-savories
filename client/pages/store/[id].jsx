import { useContext } from 'react';
import Link from 'next/link';
import Sidebar from '../../components/sidebar';
import { CartContext } from '../../contexts/CartContext';
import { getProductById, getMenu } from '../../utils/menu';
import styles from '../../styles/Index.module.css';

const ProductPage = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);

  return (
    <div>
      <h1>{product.name}</h1>
      <div>
        <div>
          <div>
            <img src={product.img} />
            <p>{product.description}</p>
          </div>
          <div>
            <small>Nutritional Information: {product.nutrition}</small><br />
            <small>Ingredients: {product.ingredients}</small>
          </div>
        </div>
        <span>
          <Link href={'/'}>
            <button>Back to homepage</button>
          </Link>
        </span>
        <Sidebar />
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
        id: product.id.toString(),
      },
    })),
    fallback: false,
  };
};

export default ProductPage;