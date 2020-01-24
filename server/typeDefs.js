const { gql } = require("apollo-server");
const rootTypeDef = gql`
  type CombatSkill {
    operator: Operator
    stage: String
    description: String
    isAutoCharge: Boolean
    isAuto: Boolean
    duration: Int
    spCost: Int
    spInitial: Int
  }
  input CombatSkillInput {
    operator: String!
    stage: String
    stageId: Int
    description: String!
    isAutoCharge: Boolean
    isAuto: Boolean
    duration: Int
    spCost: Int
    spInitial: Int
  }
  type Operator {
    iid: Int
    name: String
    class: Class
    rarity: Int
    origin: Origin
    faction: Faction
    race: Race
    isRanged: Boolean
    stages: [Stage]
    combatSkills: [CombatSkill]
  }
  input OperatorInput {
    iid: Int!
    name: String!
    class: String!
    rarity: Int
    origin: String
    faction: String
    race: String
    isRanged: Boolean
  }
  type OperatorStage {
    operator: Operator
    stage: String
    hp: Int
    atk: Int
    def: Int
    cost: Int
    block: Int
    res: Int
    redeploy: Int
    atkSpeed: Int
  }
  input OperatorStageInput {
    operator: String!
    stage: String
    stageId: Int
    hp: Int!
    atk: Int!
    def: Int!
    cost: Int!
    block: Int!
    res: Int!
    redeploy: Int!
    atkSpeed: Int!
  }
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

const typeDefs = [rootTypeDef];
["classes", "factions", "origins", "races", "stages"].forEach(v =>
  typeDefs.push(require(`./${v}/typeDefs.js`))
);
module.exports = typeDefs;

/*
  type Query {
    getOperators: [Operator]
    getOperator(name: String, iid: Int): Operator
    getCombatSkill(
      characterName: String!
      stage: String
      stageId: Int
    ): CombatSkill
    getCombatSkills: [CombatSkill]
  }
  type Mutation {
    createOperator(input: OperatorInput!): Operator
    updateOperator(name: String!, input: OperatorInput!): Operator
    deleteOperator(name: String!): Boolean
    createCombatSkill(
      characterName: String!
      input: CombatSkillInput!
    ): CombatSkill
    updateCombatSkill(
      characterName: String!
      stage: String
      stageId: Int
    ): CombatSkill
    deleteCombatSkill(
      characterName: String!
      stage: String
      stageId: Int
    ): Boolean
  }

*/
