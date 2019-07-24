// #1 Import the gql method from apollo-server-express
const { gql } = require('apollo-server-express');

// #2 Construct a schema with gql and using the GraphQL schema language
const typeDefs = gql`
  type Post {
    _id: ID
    title: String
    content: String
  }
  
  type Project {
    _id: ID
    user: User!
    title: String
    imgUrl: String
    desc: String  
  }
  
  type ProjectInput {
    title: String
    imgUrl: String
    desc: String 
  }
  
  type User {
    _id: ID!
    email: String!
    token: String!
    projects: [Project]
  }
  input UserInput {
    email: String!
    password: String!
    confirm: String!
  }
  type Query {
    me: User
    posts: [Post]
    users: [User] 
    projects(userId: String!): [Project]
    verifyToken(token: String!): User
  }
  type Mutation {
    addPost(title: String!, content: String!): Post
    createUser(userInput: UserInput): User
    login(email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
