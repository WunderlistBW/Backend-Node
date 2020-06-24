module.exports = {
  isValidUser,
  isValidTask,
  isValidTaskUpdate,
};

function isValidUser(user) {
  return Boolean(user.username && user.password);
}
function isValidTask(task) {
  return Boolean((task.name && task.user_id) || Array.isArray(task));
}
function isValidTaskUpdate(changes) {
  return Boolean(changes.name || changes.dueDate || changes.completed);
}
