module.exports = function(knex) {
  const result = {};
  [
    "classes",
    "operators",
    "factions",
    "origins",
    "races",
    "stages",
    "combatSkills",
    "operatorStages"
  ].forEach(v => (result[v] = require(`./${v}/model.js`)(knex)));
  return result;
};
