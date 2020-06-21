const { createToken, isValid } = require("./index");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/constants");

const username = "brandon",
  password = "hello",
  id = 1;

describe("utils", () => {
  describe("isValid()", () => {
    it("should only return true if username and pass are provided", () => {
      expect(isValid({ username, password })).toBe(true);
      expect(isValid({ username })).toBe(false);
    });
  });
  describe("createToken()", () => {
    it("should create a valid token with no password stored", () => {
      const myToken = createToken({ id, username });
      jwt.verify(myToken, "wrong secret", (err, decodedToken) => {
        expect(err.message).toBe("invalid signature");
      });
      jwt.verify(myToken, jwt_secret, (err, decodedToken) => {
        expect(decodedToken.username).toBe(username);
        expect(decodedToken.id).toBe(id);
        expect(decodedToken.password).toBeUndefined();
      });
    });
  });
});
