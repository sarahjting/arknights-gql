const { gql } = require("apollo-server");
const rootTypeDef = gql`
  type Origin {
    name: String
    operators: [Operator]
  }
  input OriginInput {
    name: String!
  }
  type Race {
    name: String
    operators: [Operator]
  }
  input RaceInput {
    name: String!
  }
  type Faction {
    name: String
    operators: [Operator]
  }
  input FactionInput {
    name: String!
  }
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
  type Stage {
    id: Int
    name: String
    operators: [Operator]
    combatSkills: [CombatSkill]
  }
  input StageInput {
    name: String!
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
["classes"].forEach(v => typeDefs.push(require(`./${v}/typeDefs.js`)));
module.exports = typeDefs;

/*
  type Query {
    getStages: [Stage]
    getStage(name: String, stageId: Int): Stage
    getOperators: [Operator]
    getOperator(name: String, iid: Int): Operator
    getOrigins: [Origin]
    getOrigin(name: String!): Origin
    getFactions: [Faction]
    getFaction(name: String!): Faction
    getRaces: [Race]
    getRace(name: String!): Race
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
    createStage(input: StageInput!): Stage
    updateStage(name: String, id: Int, input: StageInput!): Stage
    deleteStage(name: String!): Boolean
    createOrigin(input: OriginInput!): Origin
    updateOrigin(name: String!, input: OriginInput!): Origin
    deleteOrigin(name: String!): Boolean
    createRace(input: RaceInput!): Race
    updateRace(name: String!, input: RaceInput!): Race
    deleteRace(name: String!): Boolean
    createFaction(input: FactionInput!): Faction
    updateFaction(name: String!, input: FactionInput!): Faction
    deleteFaction(name: String!): Boolean
  }

*/
