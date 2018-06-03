// Create users table
exports.up = (knex, Promise) => {
  knex.schema.createTable("users", t => {
    t.increments("userId");
    t.string("first_name").notNull();
    t.string("last_name").notNull();
    t.string("address");
    t.string("email").notNull();
    t.string("phone");
    t.timestamps(true, true);
  });
};

exports.down = (knex, Promise) => {
  knex.schema.dropTable("users");
};
