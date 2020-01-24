const data = require("../json/skills.json");
exports.seed = function(knex) {
  return knex("combat_skills").insert(
    data.map(row => {
      return {
        operator_id: row.operator_id,
        stage_id: row.stage_id,
        description: row.description,
        is_auto_charge: !row.is_charged_by_attack,
        is_auto: !row.is_manually_activated,
        duration: row.duration,
        sp_cost: row.sp_cost,
        sp_initial: row.sp_initial
      };
    })
  );
};
