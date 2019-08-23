import React, { useState, useEffect, useContext, FunctionComponent } from 'react';
import './Home.css';
import { Button } from 'antd';
import {AuthUser} from "../../types";
import { Link } from 'react-router-dom';

interface HomepageProps {
    authUser: AuthUser
}

export const Home: FunctionComponent<HomepageProps> = ({ authUser }) => {

    return (
        <div className="home__wrapper">
            <section className="home__header">
                <h1 className="home__tagline">Get some sleep.</h1>
                <h2 className="home__subheader">Your portfolio is taken care of.</h2>
                <Link to={authUser ? "/editor" : "/login"}>
                    <Button type="primary" size="large" className="home__getstarted">Get Started!</Button>
                </Link>
                <img src="https://res.cloudinary.com/dgeb3iekh/image/upload/v1566261823/hacking-2903156_640_l53l7s.jpg" className="home__computerman"/>
            </section>
            <section className="info__wrapper">
                <img  className="info__undraw" src="https://res.cloudinary.com/dgeb3iekh/image/upload/v1566521545/undraw_portfolio_website_lidw_1_s767bo.svg" alt=""/>
                <h2 className="info__header"><span className="info__header--highlight">Fast</span> and <span className="info__header--highlight">professional</span> portfolio builder for developers & digital creatives.</h2>
            </section>
        </div>
    )
};