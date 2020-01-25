exports.up = function(knex) {
  return knex.schema.createTable("factions", t => {
    t.increments().index();
    t.string("name", 20)
      .unique()
      .notNullable()
      .index();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("factions");
};
