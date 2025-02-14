const Client = require("../models/Client");
const { generateToken } = require("../middlewares/auth");

const register = async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    const token = await generateToken(client);
    return res.status(201).send({ client, token });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const login = async (req, res) => {
  try {
    const client = await Client.findOne({ email: req.body.email });
    if (!client || !(await client.login(req.body.password))) {
      return res.status(401).send({ error: "Login failed" });
    }
    const token = await generateToken(client);
    res.send({ client, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { register, login };
