const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("./config/database");
const User = require("./modules/auth/models/user.model");
const Project = require('./modules/projects/models/project.model');
require("dotenv").config();

const auth = require("./modules/auth/helpers");
// Import GraphQL type definitions
const typeDefs = require("./graphqlSchema.ts");

// Import GraphQL resolvers
const resolvers = require("./resolvers");
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const HEADER_NAME = "Authorization";
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
      currentUser
    };
  }
});
const app = express();

// Use the Express application as middleware in Apollo server
server.applyMiddleware({ app });

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/modules/templates"));

app.get("/", function(req, res) {
  res.sendFile(path.resolve(__dirname + "/../client/src/index.html"));
});

app.get("/login", function(req, res) {
  res.redirect("/");
});

app.get("/download/:id", function(req, res) {
  const userId = req.params.id;
  let userData, projectData;
  User.findOne({ _id: userId }, (err, user) => {
      if (err) {
          console.log("Error!:", err);
      } else {
          console.log(user);
          Project.find({ user: userId}, (err, projects) => {
              if (err) {
                  console.log("Error!:", err);
              } else {
                  console.log(projects);
                  res.attachment("index.html");
                  res.render("basic", { user, projects });
              }
          });
      }
  });

});

const port = 3000;
app.listen({ port }, () => {
  console.log(
    `Server running on http://localhost:${port}${server.graphqlPath}`
  );
});
