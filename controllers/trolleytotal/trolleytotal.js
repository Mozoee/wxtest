const { calculateTrolly } = require('../../services/trollyTotal/trollyTotal');

const trolleytotal = async (req, res) => {
  const result = await calculateTrolly(req.body);
  console.log(result);
  res.send({ result });
};

module.exports = { trolleytotal };
