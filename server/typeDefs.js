const { gql } = require("apollo-server");
const rootTypeDef = gql`
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
  "operatorStages",
  "combatSkills"
].forEach(v => typeDefs.push(require(`./${v}/typeDefs.js`)));
module.exports = typeDefs;
