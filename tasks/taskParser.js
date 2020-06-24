const moment = require("moment");
const { getNextDay } = require("../utils");

function taskParser(req, res, next) {
  // For consistency across timestamping
  const momentFormat = "YYYY-MM-DD HH:MM:SS:SSZ";

  // Pull the user_id out of the decodedToken that was added from middleware
  const { id } = req.decodedToken;
  const { name } = req.body;

  // Initiate a new empty variable for scope
  let newReqBody;

  if (req.body.isRepeated) {
    // If isRepeated is set to true or 1, set the body to an array of tasks
    // The request can only continue if the relevant fields are provided as well

    if (req.body.endOn && req.body.days) {
      // Create an array of objects with the proper due date
      newReqBody = [];
      const { endOn, days } = req.body;
      const stopLoop = moment(endOn)
        .add(23, "h")
        .add(59, "m")
        .add(59, "s")
        .add(99, "ms");

      // Set the iterator to the first date after today
      const currentDate = getNextDay(days, false);

      do {
        // Push a correctly timestamped instance of each task to the newReqBody array
        newReqBody.push({
          name,
          user_id: id,
          dueDate: currentDate.format(momentFormat),
        });

        // AFTER each push and BEFORE each conditional test,
        // add 7 days to the currentDate iterator
        currentDate.add(7, "days");

        // The conditional checks if the currentDate iterator has reached our endOn date
      } while (currentDate.isSameOrBefore(stopLoop));
    } else {
      // If the necessary fields to re4peat a task are not provided, send an error
      res.status(400).json({ message: "Repeat tasks require all fields" });
    }
  } else {
    // If isRepeated is false or null, set the body to a single task object

    try {
      newReqBody = {};

      // If the days field is provided, set the relevant dueDate
      if (req.body.days) {
        newReqBody.dueDate = getNextDay(req.body.days, false).format(
          momentFormat
        );
      }

      newReqBody.name = name;
      newReqBody.user_id = id;
    } catch (e) {
      // This will probably only fail if no name is provided
      res.status(400).json({ message: "Invalid task" });
    }
  }

  // Update the req.body with the new object or array we created above
  req.body = newReqBody;
  next();
}

module.exports = taskParser;
