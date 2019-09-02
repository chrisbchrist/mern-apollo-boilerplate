import React, { FunctionComponent } from "react";
import { Drawer, Tabs, Icon } from "antd";
import { InfoForm } from './InfoForm';
import { ProjectsContainer} from "../containers/ProjectsContainer";
import { StyleMenu } from "./StyleMenu";

const { TabPane } = Tabs;

export const EditMenu: FunctionComponent<any> = () => {
  return (


      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <Icon type="user" />
              About You
            </span>
          }
          key="1"
        >
          <InfoForm/>
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="build" />
              Projects
            </span>
          }
          key="2"
        >
          <ProjectsContainer/>
        </TabPane>
          <TabPane
              tab={
                  <span>
              <Icon type="edit" />
              Style/Theme
            </span>
              }
              key="3"
          >
              <StyleMenu/>
          </TabPane>
      </Tabs>
  );
};
