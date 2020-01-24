exports.up = function(knex) {
  return knex.schema.createTable("classes", t => {
    t.increments().index();
    t.string("name", 15)
      .unique()
      .notNullable()
      .index();
    t.string("description", 250).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("classes");
};
