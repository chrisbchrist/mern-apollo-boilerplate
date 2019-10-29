import React, { FunctionComponent, useContext } from "react";
import { Project, UserInfo, UserStyles } from "../../../../types";
import { BasicProject } from "./BasicProject";
import "./Basic.css";
import { Query } from "react-apollo";
import { GET_USER } from "../../../../queries";
import { UserContext } from "../../../../App";
import {Icon, Spin} from "antd";

const socialIconDictionary = {
  facebook: "facebook",
  linkedIn: "linkedin",
  twitter: "twitter",
  codepen: "codepen",
  stackOverflow: "database"
}

interface TemplateProps {
  projects: Array<Project>;
  userInfo: UserInfo;
  styles: UserStyles;
}

export const BasicTemplate: FunctionComponent<TemplateProps> = ({
  projects,
  userInfo,
  styles
}) => {
  return (
    <div
      className="basic__wrapper"
      style={{ fontFamily: styles.font || "Raleway", fontSize: styles.fontSize + "px" }}
    >
      <div className="basic__header">
        {userInfo.profilePhoto && (<div
            className="basic__photo-frame"
            style={{ borderColor: styles.color || "#1890ff" }}
        >
          <div className="basic__photo-wrapper">
            <img src={userInfo.profilePhoto} className="basic__photo" />
          </div>
        </div>)}

        {userInfo.name && <h1 className="basic__name">{userInfo.name}</h1>}
        {userInfo.title && <h2 className="basic__title">{userInfo.title}</h2>}
        {userInfo.social && (<div className="basic__socials">
          {Object.keys(userInfo.social).map((social: string) => {
            if (userInfo.social[social] && social !== '__typename') {
              return (
                  <a className="social__link" target="_blank" href={userInfo.social[social]}>
                    <Icon className="basic__social" type={(socialIconDictionary as any)[social]}/>
                  </a>
              )
            }
          })}
        </div>)}
        {userInfo.email && (
          <h3 className="basic__email">
            <a>{userInfo.email}</a>
          </h3>
        )}
        {userInfo.location && (
          <h3 className="basic__location">{userInfo.location}</h3>
        )}
        {userInfo.about && (
          <div className="basic__about-wrapper">
            <p className="basic__about">{userInfo.about}</p>
          </div>
        )}
      </div>
      <section className="basic__projects">
        {projects.length > 0 &&
          projects.map((project: Project, index: number) => {
            return (
              <BasicProject
                customColor={styles.color}
                key={project.title + index}
                project={project}
                even={index % 2 !== 0}
              />
            );
          })}
      </section>
    </div>
  );
};

