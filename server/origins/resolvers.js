module.exports = models => {
  return {
    Query: {
      getOrigins: (parent, args) => {
        return models.origins.getAll();
      },
      getOrigin: (parent, args) => {
        return models.origins.get({ name: args.name });
      }
    },
    Mutation: {
      createOrigin: (parent, args) => {
        return models.origins.create(args.input);
      },
      updateOrigin: (parent, args) => {
        return models.origins.update(args.name, args.input);
      },
      deleteOrigin: (parent, args) => {
        return models.origins.delete(args.name);
      }
    },
    Origin: {
      operators: origin => {
        return models.operators.getAll({ origin_id: origin.id });
      }
    }
  };
};
