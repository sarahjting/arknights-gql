const { gql } = require("apollo-server");
module.exports = gql`
  type Stage {
    id: Int
    name: String
    operators: [OperatorStage]
    combatSkills: [CombatSkill]
  }
  input StageCreateInput {
    name: String!
  }
  input StageUpdateInput {
    name: String!
  }
  extend type Query {
    getStages: [Stage]
    getStage(name: String!): Stage
  }
  extend type Mutation {
    createStage(input: StageCreateInput!): Stage
    updateStage(name: String, id: Int, input: StageUpdateInput!): Stage
    deleteStage(name: String!): Boolean
  }
`;
