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
    styles: UserStyles
    rememberMe: Boolean
  }
  input UserInput {
    email: String!
    password: String!
    confirm: String!
  }
  type UserInfo {
    name: String
    title: String
    profilePhoto: String
    location: String
    about: String
    email: String
    phone: String
    github: String
    social: Socials
  }
  input UserInfoInput {
    name: String
    title: String
    profilePhoto: String
    location: String
    about: String
    email: String
    phone: String
    github: String
    social: SocialsInput
  }
  
  type Gradient {
    colors: [String]
    name: String
    direction: String
    opacity: String
  }
  
  input GradientInput {
    colors: [String]
    name: String
    direction: String
    opacity: String
  }
  
  type Header {
    colors: [String]
    size: Int
    fonts: [String]
    borderRadius: String
  }
  
  input HeaderInput {
    colors: [String]
    size: Int
    fonts: [String]
    borderRadius: String
  }
  
  type UserStyles {
    theme: String
    color: String
    font: String
    fontSize: Int
    bgPhoto: String
    gradient: Gradient
    header: Header
  }
  input UserStylesInput {
    theme: String
    color: String
    font: String
    fontSize: Int
    bgPhoto: String
    gradient: GradientInput
    header: HeaderInput
  }
  
  type Socials {
    facebook: String
    linkedIn: String
    twitter: String
    stackOverflow: String
    codepen: String
  }
  input SocialsInput {
    facebook: String
    linkedIn: String
    twitter: String
    stackOverflow: String
    codepen: String
  }
  
  
  type Query {
    me: User
    posts: [Post]
    users: [User] 
    getUser(id: ID!): User
    projects(userId: ID!): [Project]
    verifyToken(token: String!): User
  }
  type Mutation {
    addPost(title: String!, content: String!): Post
    addProject(project: ProjectInput!): Project
    updateProject(project: ProjectInput!, id: ID!): Project
    removeProject(id: ID!): Project
    createUser(userInput: UserInput!): User
    updateUser(id: ID!, user: UserInput!): User
    updateUserInfo(userInfo: UserInfoInput!, id: ID!): User
    updateUserStyles(userStyles: UserStylesInput, id: ID!): User
    login(email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
