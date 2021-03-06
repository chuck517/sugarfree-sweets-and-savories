import Link from 'next/link';
import { useContext } from 'react';

const Menu = ({ menu }) => {
  return (
    <div>
      {
        menu.map((product) => (
          <div key={product.id}>
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
            <br />
            {/* {product.description}
            <br />
            {product.nutrition}
            <br />
            {product.ingredients}
            <br /> */}
            <br />
          </div>          
        ))
      }
    </div>
  )
};

export default Menu;