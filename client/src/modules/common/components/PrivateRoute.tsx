import React, { ComponentType} from 'react';
import {Route, Redirect, RouteComponentProps} from 'react-router-dom';
import client from "../../../settings/createApolloClient";
import {gql} from "apollo-boost";


//import { authenticationService } from '@/_services';

interface PrivateRouteProps extends RouteComponentProps {
    Component: ComponentType<any>
}

const verifyToken = () => {
    client.query({
        query: gql`
            
        `
    })
};


const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({ Component, ...rest }) => {
    const isAuth = false;
    return (
    <Route {...rest} render={(props) => (
            isAuth
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    )} />
)};