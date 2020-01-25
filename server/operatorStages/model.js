const _ = require("lodash");
module.exports = knex => {
  return {
    get: async function(where, opts = {}) {
      const query = this._knex().where(where);
      if (opts.orderBy) query.orderBy(opts.orderBy);
      return (await query).pop();
    },
    getAll: async function(where) {
      const query = this._knex();
      if (where) query.where(where);
      return await query;
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
        "hp",
        "atk",
        "def",
        "cost",
        "block",
        "res",
        "redeploy",
        "atk_speed"
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
      return knex("operator_stages");
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
        "hp",
        "atk",
        "def",
        "cost",
        "block",
        "res",
        "redeploy",
        "atkSpeed"
      ].forEach(key => {
        if (input[key] !== undefined) result[_.snakeCase(key)] = input[key];
      });
      return result;
    }
  };
};
