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
["classes", "factions", "origins", "races", "stages", "operators"].forEach(v =>
  typeDefs.push(require(`./${v}/typeDefs.js`))
);
module.exports = typeDefs;

/*
  type Query {
    getCombatSkill(
      characterName: String!
      stage: String
      stageId: Int
    ): CombatSkill
    getCombatSkills: [CombatSkill]
  }
  type Mutation {
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
