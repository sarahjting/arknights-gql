module.exports = knex => {
  return {
    getAll: async function(where) {
      const query = this._knex();
      if (where) query.where(where);
      return await query;
    },
    _knex: function(name) {
      return knex("operators");
    }
  };
};
