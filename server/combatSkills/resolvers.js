const _ = require("lodash");
module.exports = models => {
  return {
    Query: {
      getCombatSkills: (parent, args) => {
        return models.combatSkills.getAll();
      },
      getCombatSkill: (parent, args) => {
        return models.combatSkills.get(_.pick(args, ["operator", "stage"]));
      }
    },
    Mutation: {
      createCombatSkill: (parent, args) => {
        return models.combatSkills.create({
          ...args.input,
          operator: args.operator,
          stage: args.stage
        });
      },
      updateCombatSkill: (parent, args) => {
        return models.combatSkills.update({
          ...args.input,
          operator: args.operator,
          stage: args.stage
        });
      },
      deleteCombatSkill: (parent, args) => {
        return models.combatSkills.delete(_.pick(args, ["operator", "stage"]));
      }
    },
    CombatSkill: {
      isAutoCharge: combatSkill => combatSkill.is_auto_charge,
      isAuto: combatSkill => combatSkill.is_auto,
      spCost: combatSkill => combatSkill.sp_cost,
      spInitial: combatSkill => combatSkill.sp_initial,
      stage: combatSkill => models.stages.get({ id: combatSkill.stage_id }),
      operator: combatSkill =>
        models.operators.get({ id: combatSkill.operator_id })
    }
  };
};
