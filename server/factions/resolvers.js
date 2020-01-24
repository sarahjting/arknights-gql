module.exports = models => {
  return {
    Query: {
      getFactions: (parent, args) => {
        return models.factions.getAll();
      },
      getFaction: (parent, args) => {
        return models.factions.get(args.name);
      }
    },
    Mutation: {
      createFaction: (parent, args) => {
        return models.factions.create(args.input);
      },
      updateFaction: (parent, args) => {
        return models.factions.update(args.name, args.input);
      },
      deleteFaction: (parent, args) => {
        return models.factions.delete(args.name);
      }
    },
    Faction: {
      operators: faction => {
        return models.operators.getAll({ faction_id: faction.id });
      }
    }
  };
};
