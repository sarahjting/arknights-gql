module.exports = function(knex) {
  const result = {};
  ["classes", "operators"].forEach(
    v => (result[v] = require(`./${v}/model.js`)(knex))
  );
  return result;
};
