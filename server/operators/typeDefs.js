const { gql } = require("apollo-server");
module.exports = gql`
  type Operator {
    iid: Int
    name: String
    class: Class
    rarity: Int
    origin: Origin
    faction: Faction
    race: Race
    isRanged: Boolean
    stages: [OperatorStage]
    combatSkills: [CombatSkill]
    finalStage: OperatorStage
  }
  input OperatorCreateInput {
    iid: Int!
    name: String!
    class: String!
    rarity: Int!
    origin: String
    faction: String
    race: String
    isRanged: Boolean
  }
  input OperatorUpdateInput {
    iid: Int
    name: String
    class: String
    rarity: Int
    origin: String
    faction: String
    race: String
    isRanged: Boolean
  }
  input OperatorWhereInput {
    rarity: Int
    faction: String
    race: String
    class: String
  }
  enum OperatorOrderBy {
    rarity
    hp
    atk
    def
    cost
    block
    res
    redeploy
    atkSpeed
    id
  }
  extend type Query {
    getOperators(
      where: OperatorWhereInput
      orderBy: OperatorOrderBy
    ): [Operator]
    getOperator(name: String, iid: Int): Operator
  }
  extend type Mutation {
    createOperator(input: OperatorCreateInput!): Operator
    updateOperator(name: String!, input: OperatorUpdateInput!): Operator
    deleteOperator(name: String!): Boolean
  }
`;
