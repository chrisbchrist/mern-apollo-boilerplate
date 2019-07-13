import {GraphQLError} from "graphql";

const Post = require('./modules/post/models/post.model');
const User = require('./modules/auth/models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const resolvers = {
  Query: {
    posts: () => Post.find({}),
    users: () => User.find({}),
    login: (token: string) => {
    }
  },

  // The mutation resolvers must return the created object.
  Mutation: {
    addPost: (parent: any, post: any) => {
      // Create a new record in the database
      const newPost = new Post({title: post.title, content: post.content});
      // Save the record and return it
      return newPost.save();
    },
    createUser: async (parent: any, args: any) => {
      const {email, password, confirm} = args.userInput;

      if (!validator.isEmail(email)) {
        throw new Error('Invalid email.');
      }

      const userExists = await User.findOne({email});
      if (userExists) {
        throw new Error('User already exists!');
      }

      if (password != confirm) {
        throw new Error('Passwords must match!');
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User(
          {
            email: args.userInput.email,
            password: hashedPassword
          },
          (err: GraphQLError) => {
            if (err) throw err;
          }
      );
      user.save();

      const token = jwt.sign({id: user._id}, process.env.SECRET);
      const response = {token, password: null, ...user._doc};
      console.log(response);
      return response;
    }
  }
};

module.exports = resolvers;