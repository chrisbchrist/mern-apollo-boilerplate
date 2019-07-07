const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('./config/database');

// #3 Import GraphQL type definitions
const typeDefs = require('./modules/post/graphqlSchema');

// #4 Import GraphQL resolvers
const resolvers = require('./modules/post/resolvers');
const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

// #7 Use the Express application as middleware in Apollo server
server.applyMiddleware({ app });

const port = 3000;

// #8 Set the port that the Express application will listen to
app.listen({ port }, () => {
  console.log(
    `Server running on http://localhost:${port}${server.graphqlPath}`
  );
});
