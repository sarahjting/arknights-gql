module.exports = knex => {
  const result = {};

  for (const key of [
    "classes",
    "factions",
    "origins",
    "races",
    "stages",
    "operators",
    "operatorStages",
    "combatSkills"
  ]) {
    const resolvers = require(`./${key}/resolvers.js`)(knex);
    Object.keys(resolvers).forEach(key => {
      if (result[key]) result[key] = { ...result[key], ...resolvers[key] };
      else result[key] = resolvers[key];
    });
  }

  return result;
};
