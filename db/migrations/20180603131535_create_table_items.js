// Create items table
exports.up = (knex, Promise) => {
  knex.schema.createTable('items', t => {
    t.increments('itemId');
    t.string('img_link');
    t.string('title', 20).notNull();
    t.text('details');
    t.dateTime("last_seen").notNull();;
    t.string('email');
    t.string('phone');
    t.string('reward');
    t.string('edit_code', 3);
    t.boolean('returned', false);
    t.boolean('found', false);
    t.foreign('user').references('userId').inTable('users').notNull();
    t.timestamps(true, true);
  })
};

exports.down = (knex, Promise) => {
  knex.schema.dropTable('items');
};

