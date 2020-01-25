const { gql } = require("apollo-server");
module.exports = gql`
  type Origin {
    name: String
    operators: [Operator]
  }
  input OriginCreateInput {
    name: String!
  }
  input OriginUpdateInput {
    name: String!
  }
  extend type Query {
    getOrigins: [Origin]
    getOrigin(name: String!): Origin
  }
  extend type Mutation {
    createOrigin(input: OriginCreateInput!): Origin
    updateOrigin(name: String!, input: OriginUpdateInput!): Origin
    deleteOrigin(name: String!): Boolean
  }
`;
