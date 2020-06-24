const jwt = require("jsonwebtoken");
const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");
const { jwt_secret } = require("../config/constants");

// Values for testing
const username = "brandon",
  password = "myNewPass",
  email = "br@nd.n",
  name = "Brandon Ramirez";
let myToken;

function auth(ep = "") {
  return `/api/auth/${ep}`;
}

describe("/api/auth AUTH ROUTER", () => {
  beforeAll(async () => {
    await db("users").truncate();
  });
  afterAll(async () => {
    await db("users").truncate();
  });
  it("should correctly return test endpoint", async () => {
    const res = await request(server).get(auth());
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ router: "up" });
  });
  describe("POST /register", () => {
    it("should pass a 400 when no or invalid credentials are passed", async () => {
      const res = await request(server).post(auth("register"));
      expect(res.status).toBe(400);
    });
    it("should pass a 201 with new ID on success", async () => {
      const res = await request(server)
        .post(auth("register"))
        .send({ username, password, email, name });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("token");
    });
    it("should refuse a request with a duplicate username", async () => {
      const res = await request(server)
        .post(auth("register"))
        .send({ username, name, password, email });
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: "Unable to create user" });
    });
  });
  describe("POST /login", () => {
    it("should pass a 400 when no or invalid credentials are passed", async () => {
      const res = await request(server).post(auth("login"));
      expect(res.status).toBe(400);
    });
    it("should pass a 200 with a token on success", async () => {
      const res = await request(server)
        .post(auth("login"))
        .send({ username, password });
      expect(res.body).toHaveProperty("token");
      expect(res.status).toBe(200);
      myToken = res.body.token;
    });
    it("should be a valid token", () => {
      jwt.verify(myToken, jwt_secret, (err, decodedToken) => {
        expect(err).toBeNull();
        expect(decodedToken.username).toBe(username);
      });
    });
    it("should pass a 401 on passing invalid credentials", async () => {
      const res = await request(server)
        .post(auth("login"))
        .send({ username, password: "thewrongpassword" });
      expect(res.status).toBe(401);
    });
  });
});
