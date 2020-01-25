const data = require("../json/classes.json");
exports.seed = function(knex) {
  return knex("classes").insert(
    data.map(row => {
      return {
        name: row.name,
        description: row.description
      };
    })
  );
};
