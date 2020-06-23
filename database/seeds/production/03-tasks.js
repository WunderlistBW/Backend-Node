exports.seed = function (knex) {
  return knex("tasks").insert([
    {
      name: "Clean",
      completed: false,
      dueDate: "2020-06-30 12:12:12.222",
      user_id: 1,
    },
    { name: "Cook", completed: false, user_id: 1 },
    { name: "Eat", completed: true, user_id: 1 },
  ]);
};
