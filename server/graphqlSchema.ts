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
    tags: [String] 
  }
  
  input ProjectInput {
    userId: String!
    title: String
    imgUrl: String
    desc: String
    tags: [String] 
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
  type UserInfo {
    name: String
    profilePhoto: String
    location: String
    about: String
    email: String
    phone: String
    github: String
  }
  input UserInfoInput {
    name: String
    profilePhoto: String
    location: String
    about: String
    email: String
    phone: String
    github: String
  }
  type Query {
    me: User
    posts: [Post]
    users: [User] 
    getUser(id: ID!): User
    projects(userId: String!): [Project]
    verifyToken(token: String!): User
  }
  type Mutation {
    addPost(title: String!, content: String!): Post
    addProject(project: ProjectInput!): Project
    removeProject(id: ID!): Project
    createUser(userInput: UserInput!, id: ID!): UserInfo
    updateUserInfo(userInfo: UserInfoInput!): User
    login(email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
