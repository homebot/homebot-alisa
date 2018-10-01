const alice = require('../');

module.exports = async function (req, res) {
  try {
    const jsonAnswer = await alice.handleRequest(req.body);
    res.json(jsonAnswer);
  } catch (err) {
    res.status(400)
      .send('Bad request');
  }
}