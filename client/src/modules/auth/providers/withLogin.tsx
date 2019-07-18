import React, { ReactComponentElement, ComponentType, Component } from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { UserInput } from '../../../../../types';

const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      token
      email
    }
  }
`;

export const withLogin = (Component: ComponentType<any>) => (props: any) => {
    return (
        <Mutation mutation={LOGIN}>
            {(login: any) => {
                return (
                    <Component
                        {...props}
                        login={(email: string, password: string) =>
                            login({
                                variables: { email, password }
                            })
                        }
                    />
                );
            }}
        </Mutation>
    );
};
