import {gql} from "apollo-boost";
import apolloClient from "../../config/createApolloClient";

export const verifyToken = async () => {
    const userQuery = gql`
          query verifyToken($token: String!) {
            verifyToken(token: $token) {
              email
              _id
              rememberMe
            }
          }
        `;
    const token = sessionStorage.getItem('token');

    if (!token) {
        return false;
    }
    const response = await apolloClient.query({ query: userQuery, variables: { token: token }});
    console.log(response);
    const user = {
        _id: response.data.verifyToken._id,
        email: response.data.verifyToken.email,
        rememberMe: response.data.verifyToken.rememberMe
    };
    return user;
}