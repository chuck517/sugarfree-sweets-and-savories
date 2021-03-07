import fetch from 'isomorphic-unfetch';

const servUrl = 'http://localhost:4000';

export const getMenu = async () => {
  const response = await fetch(`${servUrl}/store`);
  const menu = await response.json();
  return menu.map((product) => ({
    id: product._id,
    name: product.name,
    description: product.description,
    nutrition: product.nutrition,
    ingredients: product.ingredients,
    price: product.price,
    img: product.img,
  }));
}

export const getProductById = async (id) => {
  const response = await fetch(`${servUrl}/store/${id}`);
  const product = await response.json();
  return product;
}