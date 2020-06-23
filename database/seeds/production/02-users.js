const bc = require("bcryptjs");
exports.seed = function (knex) {
  return knex("users").insert([
    {
      username: "testuser",
      password: bc.hashSync("testpass", process.env.BCRYPT_ROUNDS || 8),
    },
  ]);
};
