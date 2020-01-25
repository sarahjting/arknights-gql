const { gql } = require("apollo-server");
module.exports = gql`
  type Race {
    name: String
    operators: [Operator]
  }
  input RaceCreateInput {
    name: String!
  }
  input RaceUpdateInput {
    name: String!
  }
  extend type Query {
    getRaces: [Race]
    getRace(name: String!): Race
  }
  extend type Mutation {
    createRace(input: RaceCreateInput!): Race
    updateRace(name: String!, input: RaceUpdateInput!): Race
    deleteRace(name: String!): Boolean
  }
`;
