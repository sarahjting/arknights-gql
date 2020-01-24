module.exports = models => {
  return {
    Query: {
      getStages: (parent, args) => {
        return models.stages.getAll();
      },
      getStage: (parent, args) => {
        return models.stages.get(args.name);
      }
    },
    Mutation: {
      createStage: (parent, args) => {
        return models.stages.create(args.input);
      },
      updateStage: (parent, args) => {
        return models.stages.update(args.name, args.input);
      },
      deleteStage: (parent, args) => {
        return models.stages.delete(args.name);
      }
    },
    Stage: {
      operators: stage => {
        return models.operators.getAllByStageId(stage.id);
      },
      combatSkills: stage => {
        return models.combatSkills.getAll({ stage_id: stage.id });
      }
    }
  };
};
