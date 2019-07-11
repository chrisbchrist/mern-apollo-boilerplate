import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import apolloClient from './settings/createApolloClient';
import { Posts } from './modules';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './modules/nav/components/Navbar';
import LoginForm from './modules/auth/components/Login';
import SignUpForm from './modules/auth/components/SignUp';
import { Layout } from 'antd';

const { Content } = Layout;

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <Layout>
          <Navbar />
          <Content>
            <Switch>
              <Route exact path="/login" component={LoginForm} />
            </Switch>
          </Content>
        </Layout>
      </Router>
    </ApolloProvider>
  );
};

export default App;
