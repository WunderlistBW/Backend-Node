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

function getNextDay(day, excludeToday = true, refDate = new Date()) {
  if (day < 0 || day > 6) return moment(refDate);
  refDate.setDate(
    refDate.getDate() +
      (!!excludeToday + ((day + 7 - refDate.getDay() - !!excludeToday) % 7))
  );
  const date = moment(refDate);
  return date;
}
