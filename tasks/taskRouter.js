const router = require("express").Router();
const Tasks = require("./taskModel");

router.get("/", async (req, res) => {
  const { id } = req.decodedToken;
  try {
    const tasks = await Tasks.getByUserId(id);
    res.status(200).json(tasks);
  } catch (e) {
    res.status(500).json({ message: "Unable to complete your request" });
  }
});

router.post("/", repeatMiddleware, async (req, res) => {
  const { body: newTask } = req;
  if (isValidTask(newTask)) {
    try {
      const [task_id] = await Tasks.add(newTask);
      res.status(201).json({ task_id });
    } catch (e) {
      res.status(500).json({ message: "Unable to complete your request" });
    }
  } else {
    res.status(400).json({ message: "Task is not valid" });
  }
});
router.get("/:task_id", async (req, res) => {
  const { task_id } = req.params;
  try {
    const task = await Tasks.getTask(task_id);
    res.status(200).json(task);
  } catch (e) {
    res.status(500).json({ message: "Unable to complete your request" });
  }
});
router.put("/:task_id", async (req, res) => {
  const { task_id } = req.params;
  const { body: changes } = req;
  if (isValidTaskUpdate(changes)) {
    try {
      const count = await Tasks.update(task_id, changes);
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: `Task ${task_id} not found` });
      }
    } catch (e) {
      res.status(500).json({ message: "Unable to complete your request" });
    }
  } else {
    res.status(400).json({ message: "No valid changes detected" });
  }
});

router.delete("/:task_id", async (req, res) => {
  const { task_id } = req.params;
  try {
    const count = await Tasks.remove(task_id);
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: `Task ${task_id} not found` });
    }
  } catch (e) {
    res.status(500).json({ message: "Unable to complete your request" });
  }
});

module.exports = router;

function isValidTask(changes) {
  return Boolean(changes.name && changes.user_id);
}
function isValidTaskUpdate(changes) {
  return Boolean(changes.name || changes.dueDate || changes.completed);
}
function repeatMiddleware(req, res, next) {
  next();
}
