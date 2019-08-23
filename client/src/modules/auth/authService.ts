import {gql} from "apollo-boost";
import apolloClient from "../../settings/createApolloClient";

export const verifyToken = async () => {
    const userQuery = gql`
          query verifyToken($token: String!) {
            verifyToken(token: $token) {
              email
              _id
            }
          }
        `;
    const token = localStorage.getItem('token');
    const response = await apolloClient.query({ query: userQuery, variables: { token: token }});
    console.log(response);
    const user = {
        id: response.data.verifyToken._id,
        email: response.data.verifyToken.email
    };
    return user;
}