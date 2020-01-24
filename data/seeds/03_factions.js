const data = require("../json/factions.json");
exports.seed = function(knex) {
  return knex("factions").insert(
    data.map(name => {
      return {
        name: name
      };
    })
  );
};
