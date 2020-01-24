exports.up = function(knex) {
  return knex.schema.createTable("operator_stages", t => {
    t.increments().index();

    t.integer("operator_id")
      .index()
      .references("id")
      .inTable("operators");

    t.integer("stage_id")
      .index()
      .references("id")
      .inTable("stages");

    t.integer("hp")
      .notNullable()
      .index();

    t.integer("atk")
      .notNullable()
      .index();

    t.integer("def")
      .notNullable()
      .index();

    t.integer("cost")
      .notNullable()
      .index();

    t.integer("block")
      .notNullable()
      .index();

    t.integer("res")
      .notNullable()
      .index();

    t.integer("redeploy")
      .notNullable()
      .index();

    t.integer("atk_speed")
      .notNullable()
      .index();

    t.unique(["operator_id", "stage_id"]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("operator_stages");
};
