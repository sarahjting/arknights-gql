exports.seed = function(knex) {
  return knex.schema.raw(
    "TRUNCATE TABLE operator_stages, combat_skills, operators, factions, origins, races, stages, classes RESTART IDENTITY"
  );
};
