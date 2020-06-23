const { createToken, isValid, getNextDay } = require("./index");
const jwt = require("jsonwebtoken");
const moment = require("moment");
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
      const myToken = createToken({ id, username, name: "Brandon" });
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
  describe("getNextDay()", () => {
    const dateHelper = new Date();
    it("should return a moment", () => {
      expect(moment.isMoment(getNextDay(2, false))).toBe(true);
    });
    it("should return today or a date after today", () => {
      expect(
        getNextDay(2, false).isSameOrAfter(moment(dateHelper.getDate()))
      ).toBeTruthy();
    });
    it("should return same day correctly", () => {
      expect(getNextDay(dateHelper.getDay(), false).date()).toBe(
        dateHelper.getDate()
      );
    });
    it("should return a week from now with no flag passed", () => {
      expect(getNextDay(dateHelper.getDay()).date()).toBe(
        dateHelper.getDate() + 7
      );
    });
  });
});
