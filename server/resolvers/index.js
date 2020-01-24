module.exports = knex => {
  const result = {};

  for (const key of []) {
    const resolvers = require(`./${key}.js`)(knex);
    Object.keys(resolvers).forEach(key => {
      if (result[key]) result[key] = { ...result[key], ...resolvers[key] };
      else result[key] = resolvers[key];
    });
  }

  return result;
};
