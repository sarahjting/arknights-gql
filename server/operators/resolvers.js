module.exports = models => {
  return {
    Query: {
      getOperators: (parent, args) => {
        console.log("resolver", args);
        return models.operators.getAll(
          args.where ? args.where : {},
          args.orderBy ? args.orderBy : "rarity"
        );
      },
      getOperator: (parent, args) => {
        return models.operators.get({ name: args.name });
      }
    },
    Mutation: {
      createOperator: (parent, args) => {
        return models.operators.create(args.input);
      },
      updateOperator: (parent, args) => {
        return models.operators.update(args.name, args.input);
      },
      deleteOperator: (parent, args) => {
        return models.operators.delete(args.name);
      }
    },
    Operator: {
      isRanged: operator => {
        return operator.is_ranged;
      },
      faction: operator => {
        return operator.faction_id
          ? models.factions.get({ id: operator.faction_id })
          : null;
      },
      class: operator => {
        return operator.class_id
          ? models.classes.get({ id: operator.class_id })
          : null;
      },
      origin: operator => {
        return operator.origin_id
          ? models.origins.get({ id: operator.origin_id })
          : null;
      },
      race: operator => {
        return operator.race_id
          ? models.races.get({ id: operator.race_id })
          : null;
      },
      stages: operator => {
        return models.operatorStages.getAll({
          operator_id: operator.id
        });
      },
      combatSkills: operator => {
        return models.combatSkills.getAll({ operator_id: operator.id });
      },
      finalStage: operator => {
        return models.operatorStages.get(
          { operator_id: operator.id },
          { orderBy: [{ column: "stage_id", direction: "DESC" }] }
        );
      }
    }
  };
};
