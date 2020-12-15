const user = async (req, res) => {
  res.status(200).send({ name: 'test', token: '1234-455662-22233333-3333' });
};

module.exports = { user };
