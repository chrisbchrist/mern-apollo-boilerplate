import React, { FunctionComponent, useContext } from "react";
import { Project, UserInfo, UserStyles } from "../../../../types";
import { ModernProject } from "./ModernProject";
import "./Modern.css";

interface TemplateProps {
  projects: Array<Project>;
  userInfo: UserInfo;
  styles: UserStyles;
}

export const ModernTemplate: FunctionComponent<TemplateProps> = ({
  projects,
  userInfo,
  styles
}) => {
  return (
    <div
      className="modern__wrapper"
      style={{
        fontFamily: styles.font || "Raleway",
        fontSize: styles.fontSize + "px"
      }}
    >
      <div className="modern__header">
        <div
          className="modern__photo-frame"
          style={{ borderColor: styles.color || "#1890ff" }}
        >
          <div className="modern__photo-wrapper">
            {userInfo.profilePhoto && (
              <img src={userInfo.profilePhoto} className="modern__photo" />
            )}
          </div>
        </div>
        {userInfo.name && <h1 className="modern__name">{userInfo.name}</h1>}
        {userInfo.title && <h2 className="modern__title">{userInfo.title}</h2>}
        {userInfo.email && (
          <h3 className="modern__email">
            <a>{userInfo.email}</a>
          </h3>
        )}
        {userInfo.location && (
          <h3 className="modern__location">{userInfo.location}</h3>
        )}
        {userInfo.about && (
          <div className="modern__about-wrapper">
            <p className="modern__about">{userInfo.about}</p>
          </div>
        )}
      </div>
      <section className="modern__projects">
        {projects.length > 0 &&
          projects.map((project: Project, index: number) => {
            return (
              <ModernProject
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
