const request = require("supertest");
const server = require("../api/server");

const Tasks = require("./taskModel");
const db = require("../database/dbConfig");

let myToken;
const username = "brandon",
  password = "myNewPass";
const task = { name: "Take out trash", user_id: 1 };

describe("/api/tasks", () => {
  beforeAll(async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username, password });

    const {
      body: { token },
    } = await request(server)
      .post("/api/auth/login")
      .send({ username, password });
    expect(token).not.toBeNull();
    myToken = token;
  });
  afterAll(async () => {
    await db("tasks_tags").truncate();
    await db("tasks").truncate();
    await db("users").truncate();
  });
  it("should return a 401 if no token is passed", async () => {
    const res = await request(server).get("/api/tasks");
    expect(res.status).toBe(401);
  });
  describe("POST / & GET /:id", () => {
    it("should successfully create a new task", async () => {
      let res = await request(server)
        .post("/api/tasks")
        .set({ Authorization: myToken })
        .send(task);
      expect(res.status).toBe(201);
      expect(res.body).toEqual({ task_id: 1 });
      res = await request(server)
        .get("/api/tasks/1")
        .set({ Authorization: myToken });
      expect(res.status).toBe(200);
      expect(res.body.name).toEqual(task.name);
    });
    it("should pass back a 400 if data passed in isn't valid", async () => {
      const res = await request(server)
        .post("/api/tasks")
        .set({ Authorization: myToken });
      expect(res.status).toBe(400);
    });
    it("should return a 500 if user_id doesn't exist", async () => {
      const res = await request(server)
        .post("/api/tasks")
        .set({ Authorization: myToken })
        .send({ ...task, user_id: 2 });
      expect(res.status).toBe(500);
    });
  });
});
