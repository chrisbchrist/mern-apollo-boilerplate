import React, { useState, useEffect, useContext, FunctionComponent } from 'react';
import './Homepage.css';
import { Button, Icon } from 'antd';
import {AuthUser} from "../../types";
import { Link } from 'react-router-dom';

interface HomepageProps {
    authUser: AuthUser
}

export const Home: FunctionComponent<HomepageProps> = ({ authUser }) => {

    return (
        <div className="hero__wrapper">
            <section className="hero__header">
                <h1 className="hero__tagline">Get some sleep.</h1>
                <h2 className="hero__subheader">Your portfolio is taken care of.</h2>
                <Link to={authUser ? "/editor" : "/login"}>
                    <Button type="primary" shape="round" size="large" className="hero__getstarted">Get Started!</Button>
                </Link>
                <img src="https://res.cloudinary.com/dgeb3iekh/image/upload/v1566261823/hacking-2903156_640_l53l7s.jpg" className="hero__computerman"/>
                <div className="hero__svg-wrapper">
                    <svg id="wave" viewBox="0 0 1440 45" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 39C0 39 291.625 0.0315932 479.5 0C667.764 -0.0316586 771.789 34.5337 960 39C1147.5 43.4495 1440 23 1440 23V45H0V39Z" fill="white"/>
                    </svg>
                </div>
            </section>
            <section className="info__wrapper">
                <img  className="info__undraw" src="https://res.cloudinary.com/dgeb3iekh/image/upload/v1566521545/undraw_portfolio_website_lidw_1_s767bo.svg" alt=""/>
                <h2 className="info__header">
                    <span className="info__header--highlight">Fast</span> and <span className="info__header--highlight">professional</span> portfolio builder for developers & digital creatives.
                </h2>
                <div className="info__feature-icons">
                    <div className="info__icon-wrapper">
                        <Icon type="hourglass" theme="twoTone" className="info__icon"/>
                        <h3 className="info__icon-title">Fast</h3>
                        <p className="info__icon-text">Finish your portfolio <strong>today</strong>! Spend your valuable time working on the projects you want to show off, not the place you're showing them.</p>
                    </div>
                    <div className="info__icon-wrapper">
                        <Icon type="eye" theme="twoTone" twoToneColor="#eb2f96" className="info__icon"/>
                        <h3 className="info__icon-title">Professional Design</h3>
                        <p className="info__icon-text">Our custom-made and customizable templates will make your site <em>look</em> like it took you a lot longer than it did!</p>
                    </div>
                    <div className="info__icon-wrapper">
                        <Icon type="code" className="info__icon" theme="twoTone" twoToneColor="#52c41a"/>
                        <h3 className="info__icon-title">No Coding</h3>
                        <p className="info__icon-text">Enter all your content and information through our easy-to-use editor and download an automatically generated HTML file that's ready to deploy!</p>
                    </div>
                    <div className="info__icon-wrapper">
                        <Icon type="smile" theme="twoTone" className="info__icon"/>
                        <h3 className="info__icon-title">Guaranteed Happiness</h3>
                        <p className="info__icon-text">This website is guaranteed by the government of America to transform your hellish existence into a god damned utopia of boundless joy and constant euphoria.</p>
                    </div>
                </div>
            </section>
        </div>
    )
};