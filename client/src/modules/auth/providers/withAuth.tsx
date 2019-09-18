import React, {ComponentType, FunctionComponent, ReactElement, ReactNode, useEffect, useState} from 'react';
import { verifyToken } from "../authService";
import { Redirect } from "react-router";
import {Result, Button, Spin} from 'antd';
import {Link} from "react-router-dom";

// Wraps a component to verify that the user possesses a valid token before rendering
export const withAuth: <P>(Component: ComponentType<P>) => (props: P) => ReactElement = (Component) => (props) => {

    const AuthWrapper: FunctionComponent = (props: any) => {
        const [auth, setAuth] = useState<any>(null);
        const [loading, setLoading] = useState<boolean>(true);

        useEffect(() => {
            verifyToken().then(res => {
                console.log("verified?", res);
                setAuth(res);
            })
        }, []);

        useEffect(() => {
                setLoading(false);
        }, [auth]);

        if (loading) {
            return <div className="projects__loader">
                <Spin tip="Authorizing..." />
            </div>
        }

        if (!auth && !loading) {
            return <Result
                status="403"
                title="You need an account!"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Link to="/login"><Button type="primary">Log In or Register</Button></Link>}
            />;
        }

        return (
            <Component authUser={auth} {...props}/>
        )
    };

    return <AuthWrapper {...props}/>;

};
