import React, { ReactComponentElement, ComponentType, Component } from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { UserInput } from '../../../../../types';

const CREATE_USER = gql`
  mutation($userInput: UserInput) {
    createUser(userInput: $userInput) {
      _id
      token
      email
    }
  }
`;

const withSignUp = (Component: ComponentType<any>) => () => {
  return (
    <Mutation mutation={CREATE_USER}>
      {(createUser: any) => {
        return (
          <Component
            createUser={(userInput: UserInput) =>
              createUser({
                variables: { userInput }
              })
            }
          />
        );
      }}
    </Mutation>
  );
};

export default withSignUp;
