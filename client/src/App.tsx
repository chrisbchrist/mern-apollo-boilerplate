import React, {
  useState,
  createContext,
  FunctionComponent,
  useEffect
} from "react";
import { ApolloProvider } from "react-apollo";
import apolloClient from "./settings/createApolloClient";
import { gql } from "apollo-boost";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./modules/nav/components/Navbar";
import LoginForm from "./modules/auth/components/Login";
import SignUpForm from "./modules/auth/components/SignUp";
import { EditorContainer } from "./modules/Editor/containers/EditorContainer";
import { Layout } from "antd";
import { PrivateRoute } from "./modules/common/components/PrivateRoute";

const { Content } = Layout;

const App: FunctionComponent = () => {
  const [authUser, setAuthUser] = useState(null);

  const UserContext = React.createContext(null);

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
      const response = await apolloClient.query({
        query: userQuery,
        variables: { token: token }
      });
      console.log(response);
      const user = {
        id: response.data.verifyToken._id,
        email: response.data.verifyToken.email
      };
      setAuthUser(user);
    }

    const token = localStorage.getItem("token");
    if (token) {
      autoLogin(token);
    } else {
      console.log("No token");
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <UserContext.Provider value={authUser}>
        <Router>
          <Layout>
            <Navbar authUser={authUser} setAuthUser={setAuthUser} />
            <Content>
              <Switch>
                <Route
                  exact
                  path="/login"
                  render={props => (
                    <LoginForm
                      {...props}
                      setAuthUser={setAuthUser}
                      authUser={authUser}
                    />
                  )}
                />

                <Route
                  exact
                  path="/register"
                  render={props => (
                    <SignUpForm {...props} setAuthUser={setAuthUser} />
                  )}
                />
                {/*<Route path="editor" component={EditorContainer}/>*/}
                <PrivateRoute
                  isAuthenticated={true}
                  exact
                  path="/editor"
                  component={EditorContainer}
                />
              </Switch>
            </Content>
          </Layout>
        </Router>
      </UserContext.Provider>
    </ApolloProvider>
  );
};

export default App;
