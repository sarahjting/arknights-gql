const { gql } = require("apollo-server");
module.exports = gql`
  type OperatorStage {
    operator: Operator
    stage: Stage
    hp: Int
    atk: Int
    def: Int
    cost: Int
    block: Int
    res: Int
    redeploy: Int
    atkSpeed: Int
  }
  input OperatorStageCreateInput {
    hp: Int!
    atk: Int!
    def: Int!
    cost: Int!
    block: Int!
    res: Int!
    redeploy: Int!
    atkSpeed: Int!
  }
  input OperatorStageUpdateInput {
    hp: Int
    atk: Int
    def: Int
    cost: Int
    block: Int
    res: Int
    redeploy: Int
    atkSpeed: Int
  }
  extend type Mutation {
    createOperatorStage(
      operator: String!
      stage: String!
      input: OperatorStageCreateInput!
    ): OperatorStage
    updateOperatorStage(
      operator: String!
      stage: String!
      input: OperatorStageUpdateInput!
    ): OperatorStage
    deleteOperatorStage(operator: String!, stage: String!): Boolean
  }
`;
