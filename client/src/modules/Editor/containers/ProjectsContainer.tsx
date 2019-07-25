import React, { useState, FunctionComponent } from 'react';
import { Button, List } from 'antd';
import { ProjectForm } from '../components/ProjectForm';

export const ProjectsContainer: FunctionComponent<any> = () => {
    const [modalVisibility, setModalVisibility] = useState<boolean>(false);

    const toggleModal = () => {
        setModalVisibility(!modalVisibility);
    }

    return (
        <div className="projects__wrapper">
            <Button onClick={toggleModal} icon="plus" type="primary">Add Project</Button>
            <ProjectForm modalVisibility={modalVisibility} toggleModal={toggleModal}/>
        </div>
    )
}