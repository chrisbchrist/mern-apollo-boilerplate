import React, {ComponentType, FunctionComponent, ReactElement, ReactNode, useEffect, useState} from 'react';
import { verifyToken } from "../authService";
import { Redirect } from "react-router";
import { Result, Button } from 'antd';
import {Link} from "react-router-dom";

export const withAuth: <T, P>(Component: ComponentType<P>) => (props: P) => ReactElement = (Component) => (props) => {

    const AuthWrapper: FunctionComponent = (props: any) => {
        const [auth, setAuth] = useState<any>(null);

        useEffect(() => {
            verifyToken().then(res => {
                console.log(res);
                setAuth(res);
            })
        }, []);

        if (!auth) return <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Link to="/"><Button type="primary">Back Home</Button></Link>}
        />;

        return (
            <Component {...props}/>
        )
    };

    return <AuthWrapper {...props}/>;

};
