import React, { useState, FunctionComponent } from 'react';
import { Card, Icon } from 'antd';
import { Project } from "../../../types";

interface ProjectCardProps {
    project: Project;
    key: string;
}

export const ProjectCard: FunctionComponent<ProjectCardProps> = ({ project, key }) => {
    const [error, setError] = useState<boolean>(false);

    const handleError = (e: any) => {
        setError(true);
    };

    const errorFallback = (
        <div className="img-fallback__wrapper">
            <Icon type="close-circle" theme="twoTone" twoToneColor="#f74856" className="img-fallback__icon" />
            <p className="img-fallback__text">Invalid image URL!</p>
        </div>
    )

    return (
        <Card title={project.title} key={key} style={{ marginBottom: 10 }}>
            {(project.imgUrl && !error) && <img alt={project.title} src={project.imgUrl} className="project__img" onError={handleError}/>}
            {error && errorFallback}
            {project.desc}
        </Card>
    )
};