const Post = require('./models/post.model');

//  Create resolver functions to handle GraphQL queries
const resolvers = {
  Query: {
    // Query which returns posts list
    posts: () => Post.find({})
  },

  // The mutation resolvers must return the created object.
  Mutation: {
    addPost: (parent, post) => {
      // Create a new record in the database
      const newPost = new Post({ title: post.title, content: post.content });
      // Save the record and return it
      return newPost.save();
    }
  }
};

module.exports = resolvers;
