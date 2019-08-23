import React, {
  useState,
  useContext,
  useEffect,
  FunctionComponent
} from "react";
import { Button, Spin } from "antd";
import { ProjectForm } from "../components/ProjectForm";
import { UserContext } from "../../../App";
import { ProjectContext } from "./EditorContainer";
import { Query } from "react-apollo";
import { GET_PROJECTS } from "../../../queries";
import { Project } from "../../../types";
import { ProjectList } from "../components/ProjectList";

export interface ProjectsQueryVars {
  userId: string;
  id?: string;
}

export const ProjectsContainer: FunctionComponent<any> = () => {
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [projectToEdit, setProjectToEdit] = useState<Project>(null);

  const authUser = useContext(UserContext);
  const { loading, error, projects, refetchProjects } = useContext(ProjectContext);

  const toggleModal = () => {
    setModalVisibility(!modalVisibility);
  };

  const editProject = (project: Project) => {
    setProjectToEdit(project);
    toggleModal();
  };

  const renderProjects = (
    projects: Array<Project>,
    refetch: any
  ): React.ReactNode => {
    if (projects.length >= 1) {
      return (
        <div>
          <div>
            <Button
              block
              type="primary"
              icon="plus"
              style={{ marginBottom: 10 }}
              onClick={() => {
                setProjectToEdit(null);
                toggleModal();
              }}
            >
              New
            </Button>
          </div>
          <ProjectList
            projects={projects}
            refetchProjects={refetch}
            editProject={editProject}
          />
        </div>
      );
    } else {
      return (
        <div className="projects__none-wrapper">
          <img
            alt="No projects"
            src="https://res.cloudinary.com/dgeb3iekh/image/upload/v1564016359/undraw_building_blocks_n0nc_u8zzdz.svg"
            className="projects__start-img"
          />
          <p className="projects__no-projects">
            Looks like you haven't added any projects yet!
          </p>
          <Button
            onClick={toggleModal}
            icon="plus"
            type="primary"
            shape="round"
            size="large"
          >
            Add Project
          </Button>
        </div>
      );
    }
  };

  useEffect(() => {
    console.log(authUser);
  }, []);

  return (
    <div className="projects__wrapper">

            <div>
              <ProjectForm
                modalVisibility={modalVisibility}
                toggleModal={toggleModal}
                authUser={authUser}
                refetchProjects={refetchProjects}
                projectToEdit={projectToEdit}
              />
              {renderProjects(projects, refetchProjects)}
            </div>
    </div>
  );
};
