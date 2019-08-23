import React, {
  useState,
    useEffect,
  createContext,
  FunctionComponent
} from "react";
import { Button, Drawer, Icon, Spin } from "antd";
import { EditMenu } from "../components/EditMenu";
import { BasicTemplate } from "../templates/Basic/Basic";
import { Query } from "react-apollo";
import {Project, UserInfo} from "../../../types";
import { GET_PROJECTS, GET_USER_AND_PROJECTS } from "../../../queries";
import { verifyToken } from "../../auth/authService";
import { UserContext } from "../../../App";
import { ProjectsQueryVars } from "./ProjectsContainer";

export const ProjectContext = createContext(null);

interface UserProjectQueryData {
  projects: Array<Project>;
  getUser: {
    _id: string,
    info: UserInfo
  }
}

export const EditorContainer: FunctionComponent<any> = ({ authUser }) => {
  const [projects, setProjects] = useState([]);
  const [drawerVisibility, setDrawerVisibility] = useState<boolean>(true);
  const [isAuthorized, setAuthorized] = useState(false);

  const toggleDrawer = (): void => {
    setDrawerVisibility(!drawerVisibility);
  };


  //Verify that user has a valid token
  useEffect(() => {

  }, []);

  return (
    <Query<UserProjectQueryData>
      query={GET_USER_AND_PROJECTS}
      variables={{ userId: authUser.id, id: authUser.id }}
      onCompleted={(data: UserProjectQueryData) => {

      }}
    >
      {({ loading, error, data, refetch }) => {
        if (loading)
          return (
            <div className="projects__loader">
              <Spin tip="Loading..." />
            </div>
          );
        if (error) return <div className="projects__errors">Error!</div>;
        console.log(data);
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
                <div className={drawerVisibility ? "drawer__open" : "drawer__open drawer__open--closed"} onClick={toggleDrawer}>
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
              <BasicTemplate projects={data.projects} userInfo={data.getUser.info}/>
            </div>
          </ProjectContext.Provider>
        );
      }}
    </Query>
  );
};
