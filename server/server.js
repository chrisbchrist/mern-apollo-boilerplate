const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('./config/database');
require('dotenv').config();

// #3 Import GraphQL type definitions
const typeDefs = require('./graphqlSchema.ts');

// #4 Import GraphQL resolvers
const resolvers = require('./resolvers');
const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

// Use the Express application as middleware in Apollo server
server.applyMiddleware({ app });

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/src/index.html'));
});

app.get('/login', function(req, res) {
  res.redirect('/');
});

const port = 3000;
app.listen({ port }, () => {
  console.log(
    `Server running on http://localhost:${port}${server.graphqlPath}`
  );
});
