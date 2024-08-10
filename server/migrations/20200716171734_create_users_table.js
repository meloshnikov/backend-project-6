export const up = (knex) =>
  Promise.all([
    knex.schema.createTable("statuses", (table) => {
      table.increments("id").primary();
      table.string("name");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    }),
    knex.schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("first_name");
      table.string("last_name");
      table.string("email");
      table.string("password_digest");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    }),
    knex.schema.createTable("tasks", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("description");
      table.integer("status_id").unsigned().notNullable().references("statuses.id");
      table.integer("creator_id").unsigned().notNullable().references("users.id");
      table.integer("executor_id").unsigned().references("users.id");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    }),
    knex.schema.createTable("labels", (table) => {
      table.increments("id").primary();
      table.string("name");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    }),
    knex.schema.createTable("tasks_labels", (table) => {
      table.increments("id").primary();
      table.integer("task_id").references("id").inTable("tasks");
      table.integer("label_id").references("id").inTable("labels");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    }),
  ]);

export const down = (knex) =>
  Promise.all([
    knex.schema.dropTable("statuses"),
    knex.schema.dropTable("users"),
    knex.schema.dropTable("tasks"),
    knex.schema.dropTable("labels"),
    knex.schema.dropTable("tasks_labels"),
  ]);
