module.exports = function(knex) {
  const result = {};
  [].forEach(v => (result[v] = require(`./${v}`)(knex)));
  return result;
};
