exports.up = function (knex) {
  return knex.schema.dropTableIfExists("users_tasks");
};

exports.down = function (knex) {
  return knex.schema.createTable("users_tasks", (t) => {
    t.increments();
    t.integer("user_id")
      .notNullable()
      .unsigned()
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    t.integer("task_id")
      .notNullable()
      .unsigned()
      .references("tasks.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};
