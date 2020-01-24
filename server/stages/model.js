module.exports = knex => {
  return {
    getAll: async function() {
      return await this._knex().select("name");
    },
    get: async function(name) {
      return (await this._whereName(name)).pop();
    },
    create: async function(input) {
      await this._knex().insert(this._formatInput(input));
      return this.get(input.name);
    },
    update: async function(name, input) {
      input = this._formatInput(input);
      const result = await this._whereName(name).update(input);
      return this.get(input.name === undefined ? name : input.name);
    },
    delete: async function(name) {
      return !!(await this._whereName(name).delete());
    },
    _knex: function(name) {
      return knex("stages");
    },
    _whereName: function(name) {
      return this._knex().whereRaw("LOWER(name) = ?", [name.toLowerCase()]);
    },
    _formatInput: function(input) {
      const result = {};
      if (input.name !== undefined) result.name = input.name;
      return result;
    }
  };
};
