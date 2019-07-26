import React, { FunctionComponent } from 'react';
import { Button, List, Icon, Card } from 'antd';
import { Project } from "../../../types";

export const ProjectList: FunctionComponent<any> = ({ projects }) => {

    return (
        <div className="projects-list__wrapper">
            { projects.length >= 1 && projects.map((project: Project, index: number) => (
                <Card title={project.title}>
                    {project.imgUrl && <img src={project.imgUrl}/>}
                    {project.desc}
                </Card>
            ))}
        </div>
    )
};