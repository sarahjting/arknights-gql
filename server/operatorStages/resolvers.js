const _ = require("lodash");
module.exports = models => {
  return {
    Mutation: {
      createOperatorStage: (parent, args) => {
        return models.operatorStages.create({
          ...args.input,
          operator: args.operator,
          stage: args.stage
        });
      },
      updateOperatorStage: (parent, args) => {
        return models.operatorStages.update({
          ...args.input,
          operator: args.operator,
          stage: args.stage
        });
      },
      deleteOperatorStage: (parent, args) => {
        return models.operatorStages.delete(
          _.pick(args, ["operator", "stage"])
        );
      }
    },
    OperatorStage: {
      operator: operatorStage =>
        models.operators.get({ id: operatorStage.operator_id }),
      stage: operatorStage => models.stages.get({ id: operatorStage.stage_id }),
      atkSpeed: operatorStage => operatorStage.atk_speed
    }
  };
};
