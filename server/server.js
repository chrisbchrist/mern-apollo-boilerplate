const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("./config/database");
const User = require("./modules/auth/models/user.model");
const Project = require("./modules/projects/models/project.model");
const axios = require("axios");
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

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/modules/templates"));

app.use(express.static("dist"));


app.get("/", (req, res) => {
  const accessToken = req.query.access_token;
  res.sendFile(path.resolve(__dirname + "/../client/src/index.html"));
});

app.get("/login", (req, res) => {
  res.redirect("/");
});

app.get("/download/:id", (req, res) => {
  const userId = req.params.id;
  let userData, projectData;
  User.findOne({ _id: userId }, (err, user) => {
    if (err) {
      console.log("Error!:", err);
    } else {
      //console.log(user);
      Project.find({ user: userId }, (err, projects) => {
        if (err) {
          console.log("Error!:", err);
        } else {
          //console.log(projects);
          res.attachment("index.html");
          res.render("basic", { user, projects });
        }
      });
    }
  });
});

// OAuth callback URL for Github API authorization
app.get("/callback", (req, res) => {
  const requestToken = req.query.code;
  const clientId = process.env.GH_CLIENT_ID;
  const clientSecret = process.env.GH_CLIENT_SECRET;
  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
      accept: "application/json"
    }
  }).then(response => {
    console.log(response.data);
    const accessToken = response.data.access_token;
    res.redirect(`/?access_token=${accessToken}`);
  });
});

// Call Pexels API on the back end to obfuscate API key
app.get('/photos', (req, res) => {
  const search = req.query.search;
  axios
      .get(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(
              search
          )}&per_page=12&page=1`,
          {
            headers: {
              'Authorization':
              process.env.PEXELS_API_KEY
            }
          }
      )
      .then(data => {
        //console.log(data.data);
        res.send(data.data);
      });
});

const port = 3000;
app.listen({ port }, () => {
  console.log(
    `Server running on http://localhost:${port}${server.graphqlPath}`
  );
});
