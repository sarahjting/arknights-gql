const _ = require("lodash");
module.exports = knex => {
  return {
    get: async function(where) {
      return (await this._knex().where(where)).pop();
    },
    getAll: async function(where) {
      return await this._knex().where(where);
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
      const result = await this._knex()
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
          if (row.length) result[`${key}_id`] = row[0].id;
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
