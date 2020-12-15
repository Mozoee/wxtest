const healthCheck = async (req, res) => {
  res.status(200).send({ message: 'The service is healthy!' });
};

module.exports = { healthCheck };
