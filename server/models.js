module.exports = function(knex) {
  const result = {};
  ["classes", "operators", "factions", "origins", "races"].forEach(
    v => (result[v] = require(`./${v}/model.js`)(knex))
  );
  return result;
};
