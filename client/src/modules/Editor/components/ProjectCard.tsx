import React, { useState, useEffect, FunctionComponent } from "react";
import { Card, Icon, Divider, Popconfirm, Tag } from "antd";
import { Project } from "../../../types";
import { Mutation } from "react-apollo";
import { REMOVE_PROJECT } from "../../../queries";

interface ProjectCardProps {
  project: Project;
  refetchProjects: any;
  editProject: any;
}

export const ProjectCard: FunctionComponent<ProjectCardProps> = ({
  project,
  refetchProjects,
  editProject
}) => {
  const [error, setError] = useState<boolean>(false);

  const handleError = (e: any) => {
    setError(true);
  };

  // useEffect(() => console.log(project), []);

    // Placeholder to use if image does not load
  const errorFallback = (
    <div className="img-fallback__wrapper">
      <Icon
        type="close-circle"
        theme="twoTone"
        twoToneColor="#f74856"
        className="img-fallback__icon"
      />
      <p className="img-fallback__text">Invalid image URL!</p>
    </div>
  );

  const cardActions = project.demoUrl || project.srcUrl ? [
      <div className="project-card__action">
              <span>
                <Icon className="project-card__action-icon" type="github" />{" "}
                  Demo
              </span>
      </div>,
      <div className="project-card__action">
          {project.srcUrl === "Private" ? (
              <span style={{ cursor: 'default', opacity: 0.5}}>
                  <Icon className="project-card__action-icon" type="eye-invisible" />{" "}
                  Source Private
                </span>
          ) : (
              <span>
                  <Icon className="project-card__action-icon" type="code" />{" "}
                  Source
                </span>
          )}
      </div>
  ] : null;

  return (
    <Mutation
      mutation={REMOVE_PROJECT}
      ignoreResults
      onCompleted={(data: any) => {
        console.log(data);
        refetchProjects();
      }}
    >
      {(removeProject: any) => (
        <Card
          title={project.title}
          style={{ marginBottom: 15 }}
          extra={
            <div className="project-card__actions">
              <Icon
                className="project-card__icon project-card__action--edit"
                type="edit"
                onClick={() => editProject(project)}
              />
              <Divider type="vertical" />
              <Popconfirm
                title="Are you sure you want to delete this project?"
                onConfirm={() =>
                  removeProject({ variables: { id: project._id } })
                }
              >
                <Icon
                  className="project-card__icon project-card__action--delete"
                  type="delete"
                />
              </Popconfirm>
            </div>
          }
          actions={cardActions}
        >
          {project.imgUrl && !error && (
            <img
              alt={project.title}
              src={project.imgUrl}
              className="project__img"
              onError={handleError}
            />
          )}
          {error && errorFallback}
          <span className="project-card__desc">{project.desc.length > 200 ? project.desc.slice(0, 200) + "..." : project.desc }</span>
          <div className="project-card__tags">
            {project.tags.length > 0 &&
              project.tags.map((tag: string, index: number) => (
                <Tag key={tag + index}>{tag}</Tag>
              ))}
          </div>
        </Card>
      )}
    </Mutation>
  );
};

export const MemoizedProjectCard = React.memo(ProjectCard);
