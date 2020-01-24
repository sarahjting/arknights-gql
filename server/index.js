require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const knex = require("knex")(require("../knexfile.js"));

// The GraphQL schema
const typeDefs = require("./typeDefs.js");
const models = require("./models.js")(knex);
const resolvers = require("./resolvers")(models);

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server
  .listen({
    port: process.env.PORT
  })
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
