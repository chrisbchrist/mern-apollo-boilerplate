const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('./config/database');

// #3 Import GraphQL type definitions
const typeDefs = require('./modules/post/graphqlSchema');

// #4 Import GraphQL resolvers
const resolvers = require('./modules/post/resolvers');
const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

// Use the Express application as middleware in Apollo server
server.applyMiddleware({ app });

app.get('/', function(req, res) {});

app.get('/login', function(req, res) {
  res.redirect('/');
  console.log('hey');
});

const port = 3000;
app.listen({ port }, () => {
  console.log(
    `Server running on http://localhost:${port}${server.graphqlPath}`
  );
});
