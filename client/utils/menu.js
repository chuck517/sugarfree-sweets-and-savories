import fetch from 'isomorphic-unfetch';

const servUrl = 'http://localhost:4000';

export const getMenu = async () => {
  const fetchConfig = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }
  const response = await fetch(`${servUrl}/store`, fetchConfig);
  const menu = await response.json();
  return menu.map((product) => ({
    _id: product._id,
    name: product.name,
    description: product.description,
    nutrition: product.nutrition,
    ingredients: product.ingredients,
    price: product.price,
    img: product.img,
  }));
}

export const getProductById = async (_id) => {
  const fetchConfig = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }
  const response = await fetch(`${servUrl}/store/${_id}`, fetchConfig);
  const product = await response.json();
  return product;
}