const router = require("express").Router();
const Tasks = require("./taskModel");
const { getNextDay } = require("../utils");

router.get("/", async (req, res) => {
  const { id } = req.decodedToken;
  try {
    const tasks = await Tasks.getByUserId(id);
    res.status(200).json(tasks);
  } catch (e) {
    res.status(500).json({ message: "Unable to complete your request" });
  }
});

router.post("/", taskParser, async (req, res) => {
  const { body: newTask } = req;
  if (isValidTask(newTask)) {
    const { name, dueDate } = req.body;
    try {
      const resData = await Tasks.add(newTask);
      res.status(201).json(resData);
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
function taskParser(req, res, next) {
  const { id } = req.decodedToken;
  const { name } = req.body;

  if (req.body.isRepeated) {
    if (req.body.endOn) {
      // Create an array of objects with the proper due date
      let newReqBody = [];

      const { endOn, isRepeated, days } = req.body;
      const dateHelper = new Date();
      const myTask = {
        name,
        user_id: id,
        dueDate: getNextDay(days).format("YYYY-MM-DD HH:MM:SS:SSZ"),
      };
      newReqBody.push(myTask);

      console.log(req.body);
      req.body = newReqBody;
    }
  } else {
    req.body = { name, user_id: id };
  }
  next();
}
