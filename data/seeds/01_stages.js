const data = require("../json/stages.json");
exports.seed = function(knex) {
  return knex("stages").insert(
    data.map(name => {
      return {
        name: name
      };
    })
  );
};
