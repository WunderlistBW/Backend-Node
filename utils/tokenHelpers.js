module.exports = {
  createToken,
};

const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/constants");

function createToken(user) {
  const { id, username } = user;
  const payload = { id, username };
  const options = { expiresIn: "1d" };
  if (user.email) payload.email = user.email;
  if (user.name) payload.name = user.name;
  return jwt.sign(payload, jwt_secret, options);
}
