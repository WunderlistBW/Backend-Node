const router = require("express").Router();
const Tasks = require("./taskModel");

router.post("/", async (req, res) => {
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

router.get("/", (req, res) => {
  res.status(200).json({ router: "up" });
});

module.exports = router;

function isValidTask(task) {
  return Boolean(task.name && task.user_id);
}
