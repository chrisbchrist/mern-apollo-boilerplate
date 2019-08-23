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
import { Home } from "./modules/Home/Home";
// import { PrivateRoute } from "./modules/common/components/PrivateRoute";

const { Content } = Layout;

export const UserContext = createContext(null);

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
            info {
              profilePhoto
            }
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
    console.log(token);
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
          <Layout style={{backgroundColor: "#fff"}}>
            <Navbar authUser={authUser} setAuthUser={setAuthUser} />
            <div className="app__main">
              <Switch>
                <Route exact path="/" render={props => <Home {...props} authUser={authUser}/>}/>
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
                <Route exact path="/editor" render={(props: any) => <EditorContainer  {...props} authUser={authUser} />}/>
                {/*<PrivateRoute*/}
                {/*  isAuthenticated={true}*/}
                {/*  exact*/}
                {/*  path="/editor"*/}
                {/*  component={EditorContainer}*/}
                {/*/>*/}
              </Switch>
            </div>
          </Layout>
        </Router>
      </UserContext.Provider>
    </ApolloProvider>
  );
};

export default App;
