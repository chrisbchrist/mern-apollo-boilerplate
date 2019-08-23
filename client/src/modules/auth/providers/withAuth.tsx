import React, {FunctionComponent, ReactElement, ReactNode, useEffect} from 'react';
import { verifyToken } from "../authService";

export const withAuth: FunctionComponent<any> = (Component: React.ComponentType) => {

    useEffect(() => {
        verifyToken().then(res => console.log(res))
    }, []);

    return (
        <Component/>
    )
}
