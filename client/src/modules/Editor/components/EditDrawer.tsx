import React, { FunctionComponent } from "react";
import { Drawer, Tabs, Icon } from "antd";
import { InfoForm } from './InfoForm';
import { ProjectsContainer} from "../containers/ProjectsContainer";

const { TabPane } = Tabs;

export const EditDrawer: FunctionComponent<any> = ({
  drawerVisibility,
  toggleDrawer
}) => {
  return (
    <Drawer
      placement="left"
      closable={true}
      width={500}
      maskClosable={false}
      onClose={toggleDrawer}
      visible={drawerVisibility}
    >
        <div className="drawer__open" onClick={toggleDrawer}><Icon type="left" className={drawerVisibility ? ' drawer__icon drawer__icon--open' : ' drawer__icon drawer__icon--closed'}/></div>
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
    </Drawer>
  );
};
