const router = require("express").Router();

router.post("/register", (req, res) => {
  res.status(200).end();
});
router.post("/login", (req, res) => {});

// Test Endpoint
router.get("/", (req, res) => {
  res.status(200).json({ router: "up" });
});

module.exports = router;
