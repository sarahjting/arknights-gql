const _ = require("lodash");
module.exports = knex => {
  return {
    getAll: async function(where) {
      const query = this._knex();
      if (where) query.where(await this._formatInput(where));
      return await query;
    },
    get: async function(where) {
      return (await this._knex().where(await this._formatInput(where))).pop();
    },
    create: async function(input) {
      const ids = await this._knex().insert(await this._formatInput(input), [
        "id"
      ]);
      return this.get({ id: ids.pop().id });
    },
    update: async function(input) {
      input = await this._formatInput(input);
      const whereParams = _.pick(input, ["operator_id", "stage_id"]);
      const updateParams = _.pick(input, [
        "description",
        "is_auto_charge",
        "is_auto",
        "duration",
        "sp_cost",
        "sp_initial"
      ]);
      await this._knex()
        .where(whereParams)
        .update(updateParams);
      return this.get(whereParams);
    },
    delete: async function(where) {
      return !!(await this._knex()
        .where(await this._formatInput(where))
        .delete());
    },
    _knex: function(name) {
      return knex("combat_skills");
    },
    _formatInput: async function(input) {
      const result = {};
      for (let key of ["operator", "stage"]) {
        if (input[key] !== undefined) {
          const row = await knex(key === "class" ? "classes" : `${key}s`)
            .select("id")
            .where("name", input[key]);
          result[`${key}_id`] = row.length ? row[0].id : null;
        }
      }
      [
        "operator_id",
        "stage_id",
        "description",
        "isAutoCharge",
        "isAuto",
        "duration",
        "spCost",
        "spInitial"
      ].forEach(key => {
        if (input[key] !== undefined) result[_.snakeCase(key)] = input[key];
      });
      return result;
    }
  };
};
