exports.seed = function (knex) {
  return knex("categories").insert([
    { name: "School" },
    { name: "Work" },
    { name: "Exercise" },
  ]);
};
