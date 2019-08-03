import React, { FunctionComponent } from 'react';
import {Project} from "../../../../types";

interface ProjectProps {
    project: Project;
    even: boolean;
}

const BasicProject: FunctionComponent<any> = ({ project, even }) => {
    return (
        <div className={even ? "basic__project basic__project--even" : "basic__project basic__project--odd"}>
            <h3 className="basic__project-title">{project.title}</h3>
            <div className="basic__project-img-wrapper">
                { project.imgUrl && <img alt={project.title} className="basic__project-img" src={project.imgUrl}/>}
            </div>
            <div className="basic__project-info">
                <p className="basic__project-desc">{project.desc}</p>
            </div>
        </div>
    )
}