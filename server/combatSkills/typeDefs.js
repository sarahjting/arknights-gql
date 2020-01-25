const { gql } = require("apollo-server");
module.exports = gql`
  type CombatSkill {
    operator: Operator
    stage: Stage
    description: String
    isAutoCharge: Boolean
    isAuto: Boolean
    duration: Int
    spCost: Int
    spInitial: Int
  }
  input CombatSkillCreateInput {
    description: String!
    isAutoCharge: Boolean
    isAuto: Boolean
    duration: Int
    spCost: Int
    spInitial: Int
  }
  input CombatSkillUpdateInput {
    description: String
    isAutoCharge: Boolean
    isAuto: Boolean
    duration: Int
    spCost: Int
    spInitial: Int
  }
  extend type Query {
    getCombatSkill(operator: String!, stage: String!): CombatSkill
    getCombatSkills: [CombatSkill]
  }
  extend type Mutation {
    createCombatSkill(
      operator: String!
      stage: String!
      input: CombatSkillCreateInput!
    ): CombatSkill
    updateCombatSkill(
      operator: String!
      stage: String!
      input: CombatSkillUpdateInput!
    ): CombatSkill
    deleteCombatSkill(operator: String!, stage: String!): Boolean
  }
`;
