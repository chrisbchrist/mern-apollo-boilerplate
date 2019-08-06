import React, { FunctionComponent } from 'react';
import {Project} from "../../../../types";

interface ProjectProps {
    project: Project;
    even: boolean;
}

export const BasicProject: FunctionComponent<any> = ({ project, even }) => {

    const imgPlaceholder = (
        <div className="basic__img-placeholder"></div>
    )

    return (
        <div className={even ? "basic__project basic__project--even" : "basic__project basic__project--odd"}>

            <div className="basic__project-wrapper">
                <h3 className="basic__project-title">{project.title}</h3>
            <div className="basic__project-img-wrapper">
                { project.imgUrl ? <img alt={project.title} className="basic__project-img" src={project.imgUrl}/> : imgPlaceholder}
            </div>
            <div className="basic__project-info">
                <p className="basic__project-desc">{project.desc}</p>
            </div>
            </div>
        </div>
    )
}