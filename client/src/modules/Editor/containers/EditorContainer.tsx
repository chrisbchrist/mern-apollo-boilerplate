import React, { useState, useContext, FunctionComponent } from "react";
import { Button, Icon } from "antd";
import { EditDrawer } from "../components/EditDrawer";

export const EditorContainer: FunctionComponent<any> = ({ authUser }) => {
  const [projects, setProjects] = useState([]);
  const [drawerVisibility, setDrawerVisibility] = useState<boolean>(true);

  const toggleDrawer = (): void => {
    setDrawerVisibility(!drawerVisibility);
  };

  return (
    <div className="editor__main">
      <EditDrawer
        drawerVisibility={drawerVisibility}
        toggleDrawer={toggleDrawer}
      />
      <Button type="primary" size="large" onClick={toggleDrawer}>
        Editor
      </Button>
    </div>
  );
};
