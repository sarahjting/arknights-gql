module.exports = models => {
  return {
    Query: {
      getClasses: (parent, args) => {
        return models.classes.getAll();
      },
      getClass: (parent, args) => {
        return models.classes.get({ name: args.name });
      }
    },
    Mutation: {
      createClass: (parent, args) => {
        return models.classes.create(args.input);
      },
      updateClass: (parent, args) => {
        return models.classes.update(args.name, args.input);
      },
      deleteClass: (parent, args) => {
        return models.classes.delete(args.name);
      }
    },
    Class: {
      operators: inputClass => {
        return models.operators.getAll({ class_id: inputClass.id });
      }
    }
  };
};
