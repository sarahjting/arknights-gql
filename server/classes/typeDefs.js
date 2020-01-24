const { gql } = require("apollo-server");
module.exports = gql`
  type Class {
    name: String
    description: String
    operators: [Operator]
  }
  input ClassCreateInput {
    name: String!
    description: String!
  }
  input ClassUpdateInput {
    name: String
    description: String
  }
  extend type Query {
    getClass(name: String!): Class
    getClasses: [Class]
  }
  extend type Mutation {
    createClass(input: ClassCreateInput!): Class
    updateClass(name: String!, input: ClassUpdateInput!): Class
    deleteClass(name: String!): Boolean
  }
`;
