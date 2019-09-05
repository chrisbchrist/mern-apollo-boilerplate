import React, { FunctionComponent, useState, useContext, useEffect } from "react";
import { BlockPicker, ChromePicker, TwitterPicker } from "react-color";
import { useQuery, useMutation } from "@apollo/react-hooks";
import "./StyleMenu.css";
import { UserContext } from "../../../App";
import { EditorContext } from "../containers/EditorContainer";
import { UPDATE_USER_STYLES } from "../../../queries";
import { Select, Divider, Icon } from 'antd';
import client from "../../../config/createApolloClient";

const { Option } = Select;

const fonts: string[] = ["Raleway", "Oswald", "Cutive Mono", "Roboto", "Open Sans Condensed", "Ubuntu"];

export const StyleMenu: FunctionComponent<any> = (props: any) => {

  // Import user ID for mutations & current styles from contexts
  const authUser = useContext(UserContext);
  const editorContext = useContext(EditorContext);

  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("Basic");
  const [color, setColor] = useState<string>("");
  const [font, setFont] = useState<string>("");

  const [updateStyles] = useMutation(UPDATE_USER_STYLES, { client });

  const toggleColorPicker = (e: React.MouseEvent) => {
    console.log("OK");
    if (e.target === e.currentTarget) {
        setShowColorPicker(!showColorPicker);
    }

  };

  const saveStyles = () => {
    const userStyles = {
      theme: "Basic",
      color,
      font
    };
    updateStyles({ variables: { userStyles, id: authUser.id}})
  };

  useEffect(() => {
    saveStyles();
  }, [color, font, theme]);

  const onChangeColor = (color: any) => {
    //console.log(color);
    setColor(color.hex);
  };

  const onChangeFont = (val: any) => {
    //console.log(val);
    setFont(val);
  };

  const popover = {
    position: "absolute",
    zIndex: 10
  } as React.CSSProperties;

  const cover = {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 0
  } as React.CSSProperties;


  return (
    <div className="styles__wrapper">
      <div className="styles__color-wrapper">
        <label className="styles__color-label ant-form-item-label">
          Accent Color:
        </label>
        <div
          className="styles__color-swatch"
          onClick={toggleColorPicker}
          style={{ background: color || "#1890ff" }}
        >
          {showColorPicker && (
            <TwitterPicker
              color={color}
              onChange={onChangeColor}
              style={{ position: "absolute", top: "35px" }}
            />
          )}
        </div>
        {showColorPicker && <div style={cover} onClick={toggleColorPicker} />}
      </div>
      <div className="styles__font-wrapper">
        <label className="styles__color-label ant-form-item-label">
          Font:
        </label>
        <Select placeholder="Font" onChange={onChangeFont} className="styles__font-select" style={{ fontFamily: font }}>
          {fonts.map((font, index) => <Option key={font + index} value={font} style={{ fontFamily: font }}>{font}</Option>)}
        </Select>
      </div>

      <div className="styles__themes-wrapper">
        <h3 className="styles__themes-title"><Icon type="layout" theme="twoTone" /> Themes</h3>
      </div>
    </div>
  );
};
