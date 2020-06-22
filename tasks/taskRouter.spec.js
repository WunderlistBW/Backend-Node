const request = require("supertest");
const server = require("../api/server");
const Tasks = require("./taskModel");

describe("taskRouter.js", () => {
  describe("GET /api/tasks", () => {

    it("should temporarily return 200 always", async () => {
      const res = await request(server).get("/api/tasks")
      expect(res.status).toBe(200);
    })
  })
})