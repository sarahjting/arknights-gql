module.exports = knex => {
  return {
    getAll: async function(where) {
      const query = this._knex();
      if (where) query.where(where);
      return await query;
    },
    getAllByStageId: async function(stageId) {
      console.log(stageId);
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
    _knex: function(name) {
      return knex("operators");
    }
  };
};
