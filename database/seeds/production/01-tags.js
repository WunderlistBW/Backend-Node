exports.seed = function (knex) {
  return knex("tags").insert([
    { name: "School" },
    { name: "Work" },
    { name: "Exercise" },
  ]);
};
