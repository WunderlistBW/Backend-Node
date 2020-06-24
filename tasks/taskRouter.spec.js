const request = require("supertest");
const server = require("../api/server");

const db = require("../database/dbConfig");

let myToken;
const username = "brandon",
  password = "myNewPass";
const task = { name: "Take out trash" };
const taskUpdates = { completed: true, name: "Take out trash and recycling" };

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
      // expect(res.body).toEqual({ task_id: 1 });
      res = await request(server)
        .get("/api/tasks/1")
        .set({ Authorization: myToken });
      expect(res.status).toBe(200);
      expect(res.body.name).toEqual(task.name);
      expect(res.body.completed).toBeFalsy();
    });
    it("should pass back a 400 if data passed in isn't valid", async () => {
      const res = await request(server)
        .post("/api/tasks")
        .set({ Authorization: myToken });
      expect(res.status).toBe(400);
    });
  });
  describe("PUT /:id", () => {
    it("should successfully update a task", async () => {
      let res = await request(server)
        .put("/api/tasks/1")
        .set({ Authorization: myToken })
        .send(taskUpdates);
      expect(res.status).toBe(204);
      res = await request(server)
        .get("/api/tasks/1")
        .set({ Authorization: myToken });
      expect(res.status).toBe(200);
      expect(res.body.name).toBe(taskUpdates.name);
      expect(res.body.completed).toBeTruthy();
    });
    it("should return a 400 if no or invalid changes are passed", async () => {
      let res = await request(server)
        .put("/api/tasks/1")
        .set({ Authorization: myToken });
      expect(res.status).toBe(400);
      res = await request(server)
        .put("/api/tasks/1")
        .send({ something: "wrong" })
        .set({ Authorization: myToken });
      expect(res.status).toBe(400);
    });
    it("should return a 404 if task_id is invalid", async () => {
      const res = await request(server)
        .put("/api/tasks/2")
        .send(taskUpdates)
        .set({ Authorization: myToken });
      expect(res.status).toBe(404);
    });
  });
  describe("GET /", () => {
    // returns all of a users tasks in an array
    it("should get all tasks for a user", async () => {
      const {
        body: [taskFromDb],
      } = await request(server)
        .get("/api/tasks")
        .set({ Authorization: myToken });
      expect(taskFromDb.name).toBe(taskUpdates.name);
    });
  });
  describe("DELETE /:id", () => {
    it("should successfully delete a task", async () => {
      let res = await request(server)
        .delete("/api/tasks/1")
        .set({ Authorization: myToken });
      expect(res.status).toBe(204);
      res = await request(server)
        .get("/api/tasks/1")
        .set({ Authorization: myToken });
      expect(res.status).toBe(200);
      expect(res.body).toBeFalsy();
    });
    it("should pass 404 if task_id is invalid", async () => {
      const res = await request(server)
        .delete("/api/tasks/1")
        .set({ Authorization: myToken });
      expect(res.status).toBe(404);
    });
  });
  describe("New task POST - repeated", () => {
    it("should parse a request into an array of tasks", async () => {
      let res = await request(server)
        .post("/api/tasks")
        .set({ Authorization: myToken })
        .send({
          name: task.name,
          days: 2,
          isRepeated: true,
          endOn: "2020-08-24",
        });
      res = await request(server)
        .get("/api/tasks")
        .set({ Authorization: myToken });
    });
  });
});
