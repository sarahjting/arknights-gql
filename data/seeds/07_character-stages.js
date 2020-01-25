const data = require("../json/character-stages.json");
exports.seed = function(knex) {
  return knex("operator_stages").insert(
    data.map(row => {
      return {
        operator_id: row.character_id,
        stage_id: row.stage_id,
        hp: row.hp,
        atk: row.atk,
        def: row.def,
        res: row.res,
        redeploy: row.redeploy,
        cost: row.cost,
        block: row.block,
        atk_speed: row.atk_speed
      };
    })
  );
};
