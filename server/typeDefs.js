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
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

const typeDefs = [rootTypeDef];
[
  "classes",
  "factions",
  "origins",
  "races",
  "stages",
  "operators",
  "operatorStages"
].forEach(v => typeDefs.push(require(`./${v}/typeDefs.js`)));
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
