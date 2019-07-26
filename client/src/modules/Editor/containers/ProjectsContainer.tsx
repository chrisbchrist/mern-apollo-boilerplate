import React, { useState, useContext, useEffect, FunctionComponent } from "react";
import { Button, List } from "antd";
import { ProjectForm } from "../components/ProjectForm";
import { UserContext } from "../../../App";
import { Query } from "react-apollo";
import { GET_PROJECTS } from "../../../queries";
import { Project } from "../../../types";
import { ProjectList } from "../components/ProjectList";

interface ProjectsQueryVars {
  userId: string;
}

export const ProjectsContainer: FunctionComponent<any> = () => {
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const authUser = useContext(UserContext);

  const toggleModal = () => {
    setModalVisibility(!modalVisibility);
  };

  const renderProjects = (projects: Array<Project>) => {
    if (projects.length >= 1) {
      return <ProjectList projects={projects} />;
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
          <ProjectForm
            modalVisibility={modalVisibility}
            toggleModal={toggleModal}
          />
        </div>
      );
    }
  };

  useEffect(() => {
      console.log(authUser);
  }, [])



  return (
    <div className="projects__wrapper">
      <Query<Array<Project>, ProjectsQueryVars>
        query={GET_PROJECTS}
        variables={{ userId: authUser.id }}
      >
        {({ loading, error, data }) => {
            console.log(data);
          if (loading)
            return <div className="projects__loader">Loading...</div>;
          if (error) return <div className="projects__errors">Error!</div>;

            return renderProjects(data);
        }}
      </Query>
    </div>
  );
};
