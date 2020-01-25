exports.up = function(knex) {
  return knex.schema.createTable("races", t => {
    t.increments().index();
    t.string("name", 15)
      .unique()
      .notNullable()
      .index();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("races");
};
