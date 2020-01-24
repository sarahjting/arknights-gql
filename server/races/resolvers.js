module.exports = models => {
  return {
    Query: {
      getRaces: (parent, args) => {
        return models.races.getAll();
      },
      getRace: (parent, args) => {
        return models.races.get(args.name);
      }
    },
    Mutation: {
      createRace: (parent, args) => {
        return models.races.create(args.input);
      },
      updateRace: (parent, args) => {
        return models.races.update(args.name, args.input);
      },
      deleteRace: (parent, args) => {
        return models.races.delete(args.name);
      }
    },
    Race: {
      operators: race => {
        return models.operators.getAll({ race_id: race.id });
      }
    }
  };
};
