const data = require("../json/origins.json");
exports.seed = function(knex) {
  return knex("origins").insert(
    data.map(name => {
      return {
        name: name
      };
    })
  );
};
