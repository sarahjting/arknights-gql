const { gql } = require("apollo-server");
module.exports = gql`
  type Faction {
    name: String
    operators: [Operator]
  }
  input FactionCreateInput {
    name: String!
  }
  input FactionUpdateInput {
    name: String!
  }
  extend type Query {
    getFactions: [Faction]
    getFaction(name: String!): Faction
  }
  extend type Mutation {
    createFaction(input: FactionCreateInput!): Faction
    updateFaction(name: String!, input: FactionUpdateInput!): Faction
    deleteFaction(name: String!): Boolean
  }
`;
