exports.up = function(knex) {
  return knex.schema.createTable("operators", t => {
    t.increments().index();

    t.integer("iid").index();

    t.string("name", 20)
      .unique()
      .notNullable()
      .index();

    t.integer("class_id")
      .index()
      .notNullable()
      .references("id")
      .inTable("classes");

    t.integer("rarity").notNullable();

    t.integer("origin_id")
      .index()
      .default(null)
      .references("id")
      .inTable("origins");

    t.integer("faction_id")
      .index()
      .default(null)
      .references("id")
      .inTable("factions");

    t.integer("race_id")
      .index()
      .default(null)
      .references("id")
      .inTable("races");

    t.boolean("is_ranged")
      .notNullable()
      .default(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("operators");
};
