import React, { FunctionComponent } from "react";
import { Drawer, Tabs, Icon } from "antd";
import { InfoForm } from './InfoForm';
import { ProjectsContainer} from "../containers/ProjectsContainer";

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
              Tab 3
            </span>
              }
              key="3"
          >
              Tab 3
          </TabPane>
      </Tabs>
  );
};
