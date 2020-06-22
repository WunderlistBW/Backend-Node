const db = require("../database/dbConfig");

module.exports = {
  find,
  findBy,
  findById,
  insert,
  update,
  remove,
};

function find() {
  return db("users").orderBy("id");
}
function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}
function findById(id) {
  return db("users").where({ id }).first();
}
function insert(newUser) {
  return db("users").insert(newUser);
}
function update(id, changes) {
  return db("users").where({ id }).update(changes);
}
function remove(id) {
  return db("users").where({ id }).del();
}
