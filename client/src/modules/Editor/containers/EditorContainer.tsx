import React, {
  useState,
  useEffect,
  createContext,
  FunctionComponent
} from "react";
import { Button, Drawer, Icon, Spin } from "antd";
import { EditMenu } from "../components/EditMenu";
import { BasicTemplate } from "../templates/Basic/Basic";
import { ModernTemplate } from "../templates/Modern/Modern";
import { Query } from "react-apollo";
import { AuthUser, Project, UserInfo, UserStyles } from "../../../types";
import { GET_PROJECTS, GET_USER_AND_PROJECTS } from "../../../queries";

import { withAuth } from "../../auth/providers/withAuth";
import "./EditorContainer.css";

export const EditorContext = createContext(null);

interface UserProjectQueryData {
  projects: Array<Project>;
  getUser: {
    _id: string;
    info: UserInfo;
    styles: UserStyles;
  };
}

interface EditorProps {
  authUser: any;
}

const EditorContainer: FunctionComponent<EditorProps> = ({ authUser }) => {
  const [drawerVisibility, setDrawerVisibility] = useState<boolean>(true);

  const toggleDrawer = (): void => {
    setDrawerVisibility(!drawerVisibility);
  };

  //Verify that user has a valid token
  // useEffect(() => {
  //   console.log(authUser);
  // }, []);

  return (
    <Query<UserProjectQueryData>
      skip={!authUser}
      query={GET_USER_AND_PROJECTS}
      variables={{ userId: authUser._id }}
      onCompleted={(data: UserProjectQueryData) => {}}
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
          <EditorContext.Provider
            value={{
              loading,
              error,
              projects: data.projects,
              styles: data.getUser.styles,
              refetchProjects: refetch
            }}
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
                <div
                  className={
                    drawerVisibility
                      ? "drawer__open"
                      : "drawer__open drawer__open--closed"
                  }
                  onClick={toggleDrawer}
                >
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
              <div className="editor__template-wrapper">
                <div className="editor__download-wrapper">
                  <a href={"http://localhost:3000/download/" + authUser._id}>
                    <Button
                      type="primary"
                      icon="cloud-download"
                      shape="round"
                      size="large"
                      className="editor__download-btn"
                    >
                      Download!
                    </Button>
                  </a>
                </div>
                { data.getUser.styles.theme === "Basic" && <BasicTemplate
                    projects={data.projects}
                    userInfo={data.getUser.info}
                    styles={data.getUser.styles}
                />}
                { data.getUser.styles.theme === "Modern" && <ModernTemplate
                    projects={data.projects}
                    userInfo={data.getUser.info}
                    styles={data.getUser.styles}
                />}
              </div>
            </div>
          </EditorContext.Provider>
        );
      }}
    </Query>
  );
};

export default withAuth(EditorContainer);
