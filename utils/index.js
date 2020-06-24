const jwt = require("jsonwebtoken");
const moment = require("moment");
const { jwt_secret } = require("../config/constants");
module.exports = {
  createToken,
  isValid,
  getNextDay,
};

function createToken(user) {
  const { id, username } = user;
  const payload = { id, username };
  const options = { expiresIn: "1d" };
  if (user.email) payload.email = user.email;
  if (user.name) payload.name = user.name;
  return jwt.sign(payload, jwt_secret, options);
}

function isValid(user) {
  return Boolean(
    user.username && user.password && typeof user.password === "string"
  );
}

function getNextDay(day, excludeToday = true, refDate = moment()) {
  if (day < 0 || day > 6) return refDate;
  refDate.add(
    !!excludeToday + ((day + 7 - refDate.day() - !!excludeToday) % 7),
    "days"
  );
  return refDate;
}
