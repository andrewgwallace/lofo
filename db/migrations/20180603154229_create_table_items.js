// Create items table
exports.up = (knex, Promise) => {
  return knex.schema.createTable("items", t => {
    t.increments();
    t.string("img_link");
    t.string("title", 20).notNull();
    t.text("details");
    t.string("last_seen").notNull();
    t.string("location").notNull();
    t.integer("lat");
    t.integer("lng");
    t.string("reward");
    t.string("edit_code", 3);
    t.boolean("returned", false);
    t.boolean("found", false);
    t.string('email').notNull();
    t.string('phone');
    t.timestamps(true, true);
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("items");
};
