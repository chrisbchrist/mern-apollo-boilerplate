import React, { FunctionComponent, useState } from "react";
import { BlockPicker, ChromePicker, TwitterPicker } from "react-color";
import { useQuery, useMutation } from "@apollo/react-hooks";
import "./StyleMenu.css";
import { UserContext } from "../../../App";
import { UPDATE_USER_STYLES } from "../../../queries";
import { Select } from 'antd';

const fonts = ["Raleway", "Roboto", "Open Sans Condensed", "Ubuntu"];

export const StyleMenu: FunctionComponent<any> = (props: any) => {
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [color, setColor] = useState<string>("");

  const [updateStyles] = useMutation(UPDATE_USER_STYLES);

  const toggleColorPicker = (e: React.MouseEvent) => {
    console.log("OK");
    if (e.target === e.currentTarget) {
        setShowColorPicker(!showColorPicker);
    }

  };

  const onChangeColor = (color: any) => {
    console.log(color);
    setColor(color.hex);
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
    </div>
  );
};
