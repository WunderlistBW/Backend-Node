const server = require("./server");
const request = require("supertest");

describe("server.js", () => {
  it("should be using the testing environment", () => {
    expect(process.env.DB_ENV).toEqual("testing");
  });
  it("should correctly return endpoint test message", async () => {
    const res = await request(server).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ api: "up" });
  });
});
