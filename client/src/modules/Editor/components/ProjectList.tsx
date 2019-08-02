import React, { FunctionComponent } from 'react';
import { Button, List, Icon, Card } from 'antd';
import { Project } from "../../../types";
import { ProjectCard } from "./ProjectCard";

export const ProjectList: FunctionComponent<any> = ({ projects, refetchProjects, editProject }) => {

    return (
        <div className="projects-list__wrapper">
            { projects.length >= 1 && projects.map((project: Project, index: number) => (
                <ProjectCard project={project} key={project.title + index} refetchProjects={refetchProjects} editProject={editProject}/>
            ))}
        </div>
    )
};