exports.up = function (knex) {
  return knex.schema
    .createTable("tags", (t) => {
      t.increments();
      t.string("name", 256).unique().notNullable().index();
    })
    .createTable("users", (t) => {
      t.increments();
      t.string("username", 256).notNullable().unique().index();
      t.string("name", 256);
      t.string("email", 256).unique();
      t.string("password", 256).notNullable();
    })
    .createTable("tasks", (t) => {
      t.increments();
      t.string("name", 255).notNullable();
      t.string("dueDate", 24);
      t.boolean("isRecurring");
      t.integer("dayOfWeek");
      t.boolean("completed");
    })
    .createTable("users_tasks", (t) => {
      t.increments();
      t.integer("user_id")
        .notNullable()
        .unsigned()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      t.integer("task_id")
        .notNullable()
        .unsigned()
        .references("tasks.id")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    })
    .createTable("tasks_tags", (t) => {
      t.increments();
      t.integer("task_id")
        .notNullable()
        .unsigned()
        .references("tasks.id")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      t.integer("category_id")
        .notNullable()
        .unsigned()
        .references("tags.id")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("tasks_tags")
    .dropTableIfExists("users_tasks")
    .dropTableIfExists("tasks")
    .dropTableIfExists("users")
    .dropTableIfExists("tags");
};
