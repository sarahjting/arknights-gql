const data = require("../json/characters.json");
exports.seed = function(knex) {
  return knex("operators").insert(
    data.map(row => {
      return {
        iid: row.iid,
        name: row.name,
        rarity: row.rarity,
        origin_id: row.origin_id,
        race_id: row.race_id,
        faction_id: row.faction_id,
        class_id: row.class_id,
        is_ranged: row.is_ranged
      };
    })
  );
};
