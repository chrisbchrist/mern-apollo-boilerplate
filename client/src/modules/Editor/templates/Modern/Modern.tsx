import React, { FunctionComponent, useContext } from "react";
import { Project, UserInfo, UserStyles } from "../../../../types";
import { ModernProject } from "./ModernProject";
import "./Modern.css";
import { formatColors } from "../../../common";

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
  const gradientStyles = {
    background: `linear-gradient(${styles.gradient.direction}, ${formatColors(styles.gradient.colors)})`,
    opacity: Number(styles.gradient.opacity)
  };

  return (
    <div
      className="modern__wrapper"
      style={{
        fontFamily: styles.font || "Raleway",
        fontSize: styles.fontSize + "px"
      }}
    >
      <div className="modern__header" style={{ backgroundImage: `url("${styles.bgPhoto}")`}}>
        <div className="modern__overlay" style={gradientStyles}/>
        <div className="modern__header-content" style={{ borderRadius: userInfo.profilePhoto ? '10px' : '50%'}}>
          { userInfo.profilePhoto && <div
          className="modern__photo-frame"
          style={{ borderColor: styles.color || "#1890ff" }}
        >
          <div className="modern__photo-wrapper">
              <img src={userInfo.profilePhoto} className="modern__photo" />
          </div>
        </div>}
        {userInfo.name && <h1 className="modern__name">{userInfo.name}</h1>}
        {userInfo.title && <h2 className="modern__title">{userInfo.title}</h2>}
          {projects.length > 0 && (
              <div className="work__btn-wrapper">
                <div className="ghost-btn">My Work</div>
              </div>
          )}
        </div>
      </div>
      <section className="modern__info">
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
      </section>
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
