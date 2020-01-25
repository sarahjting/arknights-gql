exports.up = function(knex) {
  return knex.schema.createTable("combat_skills", t => {
    t.increments().index();

    t.integer("operator_id")
      .index()
      .references("id")
      .inTable("operators");

    t.integer("stage_id")
      .index()
      .references("id")
      .inTable("stages");

    t.string("description", 500).notNullable();

    t.boolean("is_auto_charge").default(null);

    t.boolean("is_auto").default(null);

    t.integer("duration").default(null);

    t.integer("sp_cost").default(null);

    t.integer("sp_initial").default(null);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("combat_skills");
};
