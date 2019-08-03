import React, { FunctionComponent } from 'react';
import { Project, UserInfo } from '../../../../types';
import './Basic.css';

interface TemplateProps {
    projects: Array<Project>;
    userInfo: UserInfo;
}


const BasicTemplate: FunctionComponent<TemplateProps> = ({ projects, userInfo }) => {

    return (
        <div className="basic__wrapper">
            <div className="basic__header">
                <div className="basic__photo-wrapper">
                    { userInfo.profilePhoto && <img src={userInfo.profilePhoto} className="basic__photo"/>}
                    <h1 className="basic__name">{userInfo.name}</h1>
                    <h2 className="basic__location">{userInfo.location}</h2>
                    <div className="basic__about-wrapper">
                        <p className="basic__about">{userInfo.about}</p>
                    </div>
                </div>
            </div>
            <div className="basic__projects">

            </div>
        </div>
    )
};