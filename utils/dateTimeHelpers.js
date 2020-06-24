module.exports = {
  getNextDay,
};

const moment = require("moment");

function getNextDay(day, excludeToday = true, refDate = moment()) {
  if (day < 0 || day > 6) return refDate;
  refDate.add(
    !!excludeToday + ((day + 7 - refDate.day() - !!excludeToday) % 7),
    "days"
  );
  return refDate;
}
