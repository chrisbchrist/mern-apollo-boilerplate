import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

const withSignUp = Component => props => {
  return (
    <Mutation mutation={ADD_POST}>
      {addPost => {
        return (
          <Component
            addPost={({ title, content }) =>
              addPost({
                variables: { title, content },
                refetchQueries: [{ query: GET_POSTS }]
              })
            }
          />
        );
      }}
    </Mutation>
  );
};

export default withSignUp;
