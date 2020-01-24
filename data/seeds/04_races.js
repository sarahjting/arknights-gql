const data = require("../json/races.json");
exports.seed = function(knex) {
  return knex("races").insert(
    data.map(name => {
      return {
        name: name
      };
    })
  );
};
