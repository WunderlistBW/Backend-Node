const db = require("../database/dbConfig");

module.exports = {
  getTask,
  getByUserId,
  add,
  update,
  remove,
  addTag,
  removeTag,
};

function add(newTask) {
  return db("tasks").insert(newTask);
}
function getTask(id) {
  return db("tasks").where({ id }).first();
}
function getByUserId(id) {
  // Update this after implementing tags
  return null;
}
function update(task_id, changes) {
  return db("tasks");
}
function remove(task_id) {
  return db("tasks");
}
// Stretch Goals
function addTag(task_id, tag_id) {
  return db("tasks");
}
function removeTag(task_id, tag_id) {
  return db("tasks");
}
