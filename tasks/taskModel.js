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
  return db("tasks AS T")
    .join("users AS U", "T.user_id", "U.id")
    .select("T.id", "T.name", "T.dueDate", "T.completed")
    .where("U.id", id)
    .orderBy("T.completed")
    .orderBy("T.id");
}
function update(task_id, changes) {
  return db("tasks").where({ id: task_id }).update(changes);
}
function remove(task_id) {
  return db("tasks").where({ id: task_id }).del();
}
// Stretch Goals
function addTag(task_id, tag_id) {
  return db("tasks");
}
function removeTag(task_id, tag_id) {
  return db("tasks");
}
