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
    demoUrl: String
    srcUrl: String 
  }
  
  input ProjectInput {
    user: String!
    title: String
    imgUrl: String
    desc: String
    tags: [String]
    demoUrl: String
    srcUrl: String 
  }
  
  type User {
    _id: ID!
    email: String!
    token: String!
    projects: [Project]
    info: UserInfo
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
    updateProject(project: ProjectInput!, id: ID!): Project
    removeProject(id: ID!): Project
    createUser(userInput: UserInput!): User
    updateUserInfo(userInfo: UserInfoInput!, id: ID!): User
    login(email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
