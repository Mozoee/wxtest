const axios = require('axios');
const config = require('config');
const { get, first } = require('lodash');

const productAPIURL = get(config, 'restService.fetchProducts');
const shopperHistory = get(config, 'restService.fetchShopperHistory');
const recommended = 'Recommended';

const getProducts = async (sortOption) => {
  try {
    if (sortOption === recommended) {
      const { data } = await axios.get(shopperHistory);
      return first(data).products; // hard coded for now - not clear enough
    }
    const { data } = await axios.get(productAPIURL);
    return sortedProducts(sortOption, data);
  } catch (error) {
    throw new Error('Service failed');
  }
};

const sortedProducts = (order, products) => {
  switch (order) {
    case 'Low':
      return products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    case 'High':
      return products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    case 'Ascending':
      return products.sort((a, b) => a.name.localeCompare(b.name));
    case 'Descending':
      return products.sort((a, b) => b.name.localeCompare(a.name));
    default:
      break;
  }
};
module.exports = { getProducts };
