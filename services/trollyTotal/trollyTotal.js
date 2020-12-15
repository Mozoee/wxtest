const axios = require('axios');
const config = require('config');
const { get } = require('lodash');

const trollyTotal = get(config, 'restService.calculateTrolly');

const calculateTrolly = async (trolly) => {
  try {
    const { data } = await axios.post(trollyTotal, trolly);
    return data;
  } catch (error) {
    throw new Error('Service failed');
  }
};

module.exports = { calculateTrolly };
