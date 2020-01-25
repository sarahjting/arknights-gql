require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const knex = require("knex")(require("./knexfile.js"));
const path = require("path");

// libraries
const typeDefs = require("./server/typeDefs.js");
const models = require("./server/models.js")(knex);
const resolvers = require("./server/resolvers")(models);

// apollo set up
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});

// express set up
const app = express();
apolloServer.applyMiddleware({ app });
app.get(/(.*)/, (req, res) => {
  const uri = req.params[0] === "/" ? "/index.html" : req.params[0];
  res.sendFile(path.join(getPublicPath(uri)), err => {
    if (!err) {
      console.log(`200 🐑 ${uri}:`);
    } else {
      res.status(err.status).sendFile(getPublicPath("errors/404.html"));
      console.log(`${err.status} 🐐 ${uri}: ${err.message}`);
    }
  });
});

// let's go!
app.listen(
  {
    port: process.env.PORT
  },
  () => {
    console.log(`🚀 Client ready at http://localhost:${process.env.PORT}`);
    console.log(
      `🚀 Playground ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
    );
  }
);

function getPublicPath(fileName) {
  return path.join(`${__dirname}/public/${fileName}`);
}
