import React, { useState, useContext, FunctionComponent, useEffect } from 'react';
import { ApolloProvider } from 'react-apollo';
import apolloClient from './settings/createApolloClient';
import { gql } from 'apollo-boost';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './modules/nav/components/Navbar';
import LoginForm from './modules/auth/components/Login';
import SignUpForm from './modules/auth/components/SignUp';
import { Layout } from 'antd';

const { Content } = Layout;

const App: FunctionComponent = () => {
  const [authUser, setAuthUser] = useState(null);

  // Auto log in user if token exists in storage
  useEffect(() => {
    async function autoLogin(token: string) {
        const userQuery = gql`
          query verifyToken($token: String!) {
            verifyToken(token: $token) {
              email
              _id
            }
          }
        `;
        const response = await apolloClient.query({ query: userQuery, variables: { token: token }});
        console.log(response);
        const user = {
          id: response.data.verifyToken._id,
          email: response.data.verifyToken.email
        };
        setAuthUser(user);
    }

    const token = localStorage.getItem('token');
    if (token) {
      autoLogin(token);
    } else {
      console.log("No token");
    }

  }, []);


  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <Layout>
          <Navbar authUser={authUser} />
          <Content>
            <Switch>
              <Route exact path="/login" component={LoginForm} />
              // @ts-ignore
              <Route exact path="/register" render={(props) => <SignUpForm {...props} setAuthUser={setAuthUser}/>} />
            </Switch>
          </Content>
        </Layout>
      </Router>
    </ApolloProvider>
  );
};

export default App;
