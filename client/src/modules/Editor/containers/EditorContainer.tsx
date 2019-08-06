import React, {
  useState,
  useContext,
  createContext,
  FunctionComponent
} from "react";
import { Button, Drawer, Icon, Spin } from "antd";
import { EditMenu } from "../components/EditMenu";
import { BasicTemplate } from "../templates/Basic/Basic";
import { Query } from "react-apollo";
import { Project } from "../../../types";
import { GET_PROJECTS } from "../../../queries";
import { ProjectsQueryVars } from "./ProjectsContainer";

export const ProjectContext = createContext(null);

export const EditorContainer: FunctionComponent<any> = ({ authUser }) => {
  const [projects, setProjects] = useState([]);
  const [drawerVisibility, setDrawerVisibility] = useState<boolean>(true);

  const toggleDrawer = (): void => {
    setDrawerVisibility(!drawerVisibility);
  };

  return (
    <Query<{ projects: Array<Project> }, ProjectsQueryVars>
      query={GET_PROJECTS}
      variables={{ userId: authUser.id }}
    >
      {({ loading, error, data, refetch }) => {
        if (loading)
          return (
            <div className="projects__loader">
              <Spin tip="Loading..." />
            </div>
          );
        if (error) return <div className="projects__errors">Error!</div>;
        return (
          <ProjectContext.Provider
            value={{ loading, error, projects: data.projects, refetchProjects: refetch }}
          >
            <div className="editor__main">
              <Drawer
                placement="left"
                closable={true}
                width={500}
                maskClosable={false}
                onClose={toggleDrawer}
                visible={drawerVisibility}
                mask={false}
              >
                <div className="drawer__open" onClick={toggleDrawer}>
                  <Icon
                    type="left"
                    className={
                      drawerVisibility
                        ? " drawer__icon drawer__icon--open"
                        : " drawer__icon drawer__icon--closed"
                    }
                  />
                </div>
                <EditMenu
                  drawerVisibility={drawerVisibility}
                  toggleDrawer={toggleDrawer}
                />
              </Drawer>
              <BasicTemplate projects={data.projects}/>
            </div>
          </ProjectContext.Provider>
        );
      }}
    </Query>
  );
};
