import React, {
  useState,
  useContext,
  useEffect,
  FunctionComponent
} from "react";
import { Button, Spin } from "antd";
import { ProjectForm } from "../components/ProjectForm";
import { UserContext } from "../../../App";
import { Query } from "react-apollo";
import { GET_PROJECTS } from "../../../queries";
import { Project } from "../../../types";
import { ProjectList } from "../components/ProjectList";

export interface ProjectsQueryVars {
  userId: string;
}

export const ProjectsContainer: FunctionComponent<any> = () => {
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [projectToEdit, setProjectToEdit] = useState<Project>(null);

  const authUser = useContext(UserContext);

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
          <ProjectList projects={projects} refetchProjects={refetch} editProject={editProject}/>
        </div>
      );
    } else {
      return (
        <div className="projects__none-wrapper">
          <img
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
      <Query<{ projects: Array<Project> }, ProjectsQueryVars>
        query={GET_PROJECTS}
        variables={{ userId: authUser.id }}
      >
        {({ loading, error, data, refetch }) => {
          // console.log(data);
            if (loading) return <div className="projects__loader"><Spin tip="Loading..."/></div>;
          if (error) return <div className="projects__errors">Error!</div>;

          return (
            <div>
              <ProjectForm
                modalVisibility={modalVisibility}
                toggleModal={toggleModal}
                authUser={authUser}
                refetchProjects={refetch}
                projectToEdit={projectToEdit}
              />
              {renderProjects(data.projects, refetch)}
            </div>
          );
        }}
      </Query>
    </div>
  );
};
