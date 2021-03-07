import Link from 'next/link';
const ProductCard = ({ product }) => {  
  return (
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
  )
}

export default ProductCard;