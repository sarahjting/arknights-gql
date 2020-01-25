const _ = require("lodash");
module.exports = knex => {
  return {
    get: async function(where) {
      const query =
        where.name !== undefined
          ? this._whereName(where.name)
          : this._knex().where(where);
      return (await query).pop();
    },
    getAll: async function(where, orderBy) {
      const query = this._knex();
      if (where) query.where(await this._formatInput(where));
      console.log(where, orderBy);
      if (orderBy) {
        if (["id", "rarity"].includes(orderBy)) {
          query.orderBy(orderBy, "DESC");
        } else {
          orderBy = _.snakeCase(orderBy);
          query
            .from({
              operators: "operators",
              t1: knex("operator_stages")
                .select(
                  "operator_id",
                  knex.raw(`MAX(${orderBy}) AS ${orderBy}`)
                )
                .groupBy("operator_id")
            })
            .where("t1.operator_id", knex.raw(`operators.id`))
            .orderBy(`t1.${orderBy}`, `DESC`);
        }
      }
      return await query;
    },
    getAllByStageId: async function(stageId) {
      const query = this._knex()
        .select("operators.*")
        .join(
          "operator_stages",
          "operator_stages.operator_id",
          "=",
          "operators.id"
        )
        .where("operator_stages.stage_id", stageId);
      return await query;
    },
    create: async function(input) {
      await this._knex().insert(await this._formatInput(input));
      return this.get({ name: input.name });
    },
    update: async function(name, input) {
      input = await this._formatInput(input);
      const result = await this._whereName(name).update(input);
      return this.get({ name: input.name === undefined ? name : input.name });
    },
    delete: async function(name) {
      return !!(await this._whereName(name).delete());
    },
    _knex: function(name) {
      return knex("operators");
    },
    _whereName: function(name) {
      return this._knex().whereRaw("LOWER(name) = ?", [name.toLowerCase()]);
    },
    _formatInput: async function(input) {
      const result = {};
      for (let key of ["origin", "race", "class", "faction"]) {
        if (input[key] !== undefined) {
          const row = await knex(key === "class" ? "classes" : `${key}s`)
            .select("id")
            .where("name", input[key]);
          if (row.length) result[`${key}_id`] = row[0].id;
        }
      }
      [
        "name",
        "iid",
        "rarity",
        "originId",
        "raceId",
        "factionId",
        "classId",
        "isRanged",
        "class_id",
        "faction_id",
        "race_id",
        "origin_id"
      ].forEach(key => {
        if (input[key] !== undefined) result[_.snakeCase(key)] = input[key];
      });
      return result;
    }
  };
};
