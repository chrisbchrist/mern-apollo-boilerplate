const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('./config/database');
require('dotenv').config();

const auth = require('./modules/auth/helpers');
// #3 Import GraphQL type definitions
const typeDefs = require('./graphqlSchema.ts');

const HEADER_NAME = 'Authorization';
// #4 Import GraphQL resolvers
const resolvers = require('./resolvers');
const server = new ApolloServer({ typeDefs, resolvers, context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;

    try {
      authToken = req.headers[HEADER_NAME];

      if (authToken) {
        currentUser = await auth.tradeTokenForUser(authToken);
      }
    } catch (e) {
      console.warn(`Unable to authenticate using auth token: ${authToken}`);
    }

    return {
      authToken,
      currentUser,
    };
  }, });
const app = express();

// Use the Express application as middleware in Apollo server
server.applyMiddleware({ app });

// app.use(bodyParser.urlencoded({extended: false}));
// app.use('view engine', 'ejs');

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
