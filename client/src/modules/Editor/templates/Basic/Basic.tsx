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
}

export const BasicTemplate: FunctionComponent<TemplateProps> = ({
  projects
}) => {
  const authUser = useContext(UserContext);
  console.log(authUser);
  return (
    <Query query={GET_USER} variables={{ id: authUser.id }}>
      {({ loading, error, data, refetch }: any) => {
        if (loading)
          return (
            <div className="projects__loader">
              <Spin tip="Loading..." />
            </div>
          );
        if (error) return <div className="projects__errors">Error!</div>;
        console.log(data);
        const { info } = data.getUser;
        return (
          <div className="basic__wrapper">
            <div className="basic__header">
              <div className="basic__photo-wrapper">
                {info.profilePhoto && (
                  <img src={info.profilePhoto} className="basic__photo" />
                )}
              </div>
                {info.name && <h1 className="basic__name">{info.name}</h1>}
                {info.location && (
                  <h2 className="basic__location">{info.location}</h2>
                )}
                {info.about && (
                  <div className="basic__about-wrapper">
                    <p className="basic__about">{info.about}</p>
                  </div>
                )}

            </div>
            <section className="basic__projects">
                {projects.length > 0 && projects.map((project: Project, index: number) => {
                    return (<BasicProject project={project} even={index % 2 !== 0}/>);
                })}
            </section>
          </div>
        );
      }}
    </Query>
  );
};
