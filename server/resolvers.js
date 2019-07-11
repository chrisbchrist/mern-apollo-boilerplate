const Post = require('./modules/post/models/post.model');
const User = require('./modules/auth/models/user.model');

//  Create resolver functions to handle GraphQL queries
const resolvers = {
  Query: {
    // Query which returns posts list
    posts: () => Post.find({}),
    users: () => User.find({})
  },

  // The mutation resolvers must return the created object.
  Mutation: {
    addPost: (parent, post) => {
      // Create a new record in the database
      const newPost = new Post({ title: post.title, content: post.content });
      // Save the record and return it
      return newPost.save();
    },
    createUser: (parent, args) => {
      console.log(args.userInput, args.userInput.email);
      const newUser = new User({
        email: args.userInput.email,
        password: args.userInput.password
      });
      return newUser.save();
    }
  }
};

module.exports = resolvers;
