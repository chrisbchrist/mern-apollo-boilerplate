import React, {useState, useEffect, FunctionComponent, ComponentType} from 'react';
import {Route, Redirect, RouteComponentProps} from 'react-router-dom';
import { RouteProps} from "react-router-dom";
import client from "../../../config/createApolloClient";
import {ApolloQueryResult, gql} from "apollo-boost";

interface PrivateRouteProps extends RouteProps {
    component: ComponentType<any>;
    isAuthenticated: boolean
}

export const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({component, isAuthenticated, ...rest}: any) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);

    const verifyToken = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const auth = await client.query({
                query: gql`
            query verifyToken($token: String!) {
                verifyToken(token: $token) {
                    _id
                    email
                }
            }
        `,
                variables: {
                    token: token
                }
            }).then((res: Promise<ApolloQueryResult<any>>) => console.log(res));
            console.log(auth);
        } else {

        }

    };

    useEffect(() => {
        verifyToken();
    }, []);

    const routeComponent = (props: any) => (
        isAuthenticated
            ? React.createElement(component, props)
            : <Redirect  to={{pathname: '/login'}}/>
    );
    return <Route {...rest} render={routeComponent}/>;
};



