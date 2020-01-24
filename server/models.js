module.exports = function(knex) {
  const result = {};
  ["classes", "operators", "factions"].forEach(
    v => (result[v] = require(`./${v}/model.js`)(knex))
  );
  return result;
};
