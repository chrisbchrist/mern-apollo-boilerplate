import React, { FunctionComponent, useContext } from "react";
import { Project, UserInfo } from "../../../../types";
import { BasicProject } from "./BasicProject";
import "./Basic.css";
import { Query } from "react-apollo";
import { GET_USER } from "../../../../queries";
import { UserContext } from "../../../../App";
import { Spin } from "antd";

interface TemplateProps {
  projects: Array<Project>;
  userInfo: UserInfo;
}

export const BasicTemplate: FunctionComponent<TemplateProps> = ({
  projects,
  userInfo
}) => {
  return (
    <div className="basic__wrapper">
      <div className="basic__header">
          <div className="basic__photo-frame">
        <div className="basic__photo-wrapper">
          {userInfo.profilePhoto && (
            <img src={userInfo.profilePhoto} className="basic__photo" />
          )}
        </div>
          </div>
        {userInfo.name && <h1 className="basic__name">{userInfo.name}</h1>}
          {userInfo.email && <h3 className="basic__email"><a>{userInfo.email}</a></h3>}
        {userInfo.location && (
          <h2 className="basic__location">{userInfo.location}</h2>
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
