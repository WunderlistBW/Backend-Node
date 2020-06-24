const { createToken, isValidUser, getNextDay } = require("./index");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { jwt_secret } = require("../config/constants");

const username = "brandon",
  password = "hello",
  id = 1;

describe("utils", () => {
  describe("isValidUser()", () => {
    it("should only return true if username and pass are provided", () => {
      expect(isValidUser({ username, password })).toBe(true);
      expect(isValidUser({ username })).toBe(false);
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
    const dateHelper = moment();
    it("should return a moment", () => {
      expect(moment.isMoment(getNextDay(2, false))).toBe(true);
    });
    it("should return today or a date after today", () => {
      expect(getNextDay(2, false).isSameOrAfter(moment(dateHelper))).toBe(true);
    });
    it("should return same day correctly", () => {
      expect(getNextDay(dateHelper.day(), false).date()).toBe(
        dateHelper.date()
      );
    });
    it("should return a week from now with no flag passed", () => {
      expect(getNextDay(dateHelper.day()).date()).toBe(
        dateHelper.add(7, "days").date()
      );
    });
  });
});
