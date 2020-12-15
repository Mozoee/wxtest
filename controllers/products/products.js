const { getProducts } = require('../../services/product/product');

const products = async (req, res) => {
  const { sortOption } = req.query; //need to add validation
  const products = await getProducts(sortOption);
  res.status(200).send(products);
};

module.exports = { products };
