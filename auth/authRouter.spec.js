const server = require("../api/server");
const request = require("supertest");
const db = require("../database/dbConfig");

// Values for testing
const username = "brandon",
  password = "myNewPass",
  email = "br@nd.n",
  name = "Brandon Ramirez";

describe("/api/auth AUTH ROUTER", () => {
  beforeAll(async () => {
    await db("users").truncate();
  });
  it("should correctly return test endpoint", async () => {
    const res = await request(server).get("/api/auth");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ router: "up" });
  });
  describe("POST /register", () => {
    it("successfully creates a user", () => {
      
    })
  });
});
