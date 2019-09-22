import React, {
  FunctionComponent,
  useState,
  useContext,
  useEffect
} from "react";
import { BlockPicker, ChromePicker, TwitterPicker } from "react-color";
import { useQuery, useMutation } from "@apollo/react-hooks";
import "./StyleMenu.css";
import { UserContext } from "../../../App";
import { EditorContext } from "../containers/EditorContainer";
import { UPDATE_USER_STYLES, GET_USER_AND_PROJECTS } from "../../../queries";
import { Select, Divider, Icon, Slider } from "antd";
import client from "../../../config/createApolloClient";
import { FetchResult } from "react-apollo";
import { Theme } from "./Theme";
import data from '../gradients';

const { Option } = Select;

const fonts: string[] = [
  "Raleway",
  "Oswald",
  "Cutive Mono",
  "Roboto",
  "Open Sans Condensed",
  "Ubuntu",
  "Shadows Into Light"
];

const themes = [
  {
    name: "Basic",
    img:
      "https://res.cloudinary.com/dgeb3iekh/image/upload/c_scale,w_470/v1568942227/basic_ei3qre.png",
    desc:
      "This is your classic, clean portfolio that sacrifices fancy-shmancy bells and whistles for ruthless, professional efficency.",
    link: "#"
  }
];

export const StyleMenu: FunctionComponent<any> = (props: any) => {
  // Import user ID for mutations & current styles from contexts
  const authUser = useContext(UserContext);
  const editorContext = useContext(EditorContext);

  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [selectedTheme, setSelectedTheme] = useState<any>(
    editorContext.styles.theme ? editorContext.styles.theme : "Basic"
  );
  const [color, setColor] = useState<string>(
    editorContext.styles.color ? editorContext.styles.color : "#1890ff"
  );
  const [font, setFont] = useState<string>(
    editorContext.styles.font ? editorContext.styles.font : "Raleway"
  );
  const [fontSize, setFontSize] = useState<number>(
    editorContext.styles.fontSize ? editorContext.styles.fontSize : 16
  );

  const [updateStyles] = useMutation(UPDATE_USER_STYLES, {
    client,
    // Return array of queries to update after mutation is completed
    refetchQueries: (mutationResult: FetchResult) => [
      {
        query: GET_USER_AND_PROJECTS,
        variables: { userId: authUser.id, id: authUser.id }
      }
    ]
  });

  const toggleColorPicker = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowColorPicker(!showColorPicker);
    }
  };

  // Automatically send changes to database on each style change
  const saveStyles = () => {
    const userStyles = {
      theme: "Basic",
      color,
      font,
      fontSize
    };
    updateStyles({ variables: { userStyles, id: authUser.id } });
  };

  useEffect(() => {
    saveStyles();
  }, [color, font, selectedTheme, fontSize]);

  const onChangeColor = (color: any) => {
    //console.log(color);
    setColor(color.hex);
  };

  const onChangeFont = (val: any) => {
    //console.log(val);
    setFont(val);
  };

  const onChangeFontSize = (val: any) => {
    setFontSize(val);
  };

  const fontSizeFormatter = (val: number) => {
    return `${val}px`;
  };

  const selectTheme = (theme: any) => {
    setSelectedTheme(theme);
  }

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
      <div className="styles__item-wrapper styles__color-wrapper">
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
      <div className="styles__item-wrapper styles__font-wrapper">
        <label className="styles__color-label ant-form-item-label">Font:</label>
        <Select
          placeholder="Font"
          onChange={onChangeFont}
          className="styles__font-select"
          style={{ fontFamily: font }}
          value={font}
        >
          {fonts.map((font, index) => (
            <Option
              key={font + index}
              value={font}
              style={{ fontFamily: font }}
            >
              {font}
            </Option>
          ))}
        </Select>
      </div>
      <div className="styles__item-wrapper styles__font-size-wrapper" style={{ borderBottom: 'none'}}>
        <label className="styles__color-label ant-form-item-label">
          Font Size:
        </label>
        <Slider
          className="styles__font-slider"
          min={10}
          max={20}
          onChange={onChangeFontSize}
          tipFormatter={fontSizeFormatter}
          value={fontSize}
        />
      </div>

      <div className="styles__themes-wrapper">
        <Divider><span className="styles__themes-title">Themes</span></Divider>
        {themes.map((theme, i) => (
          <Theme theme={theme} onClick={() => setSelectedTheme(themes[i])} selected={theme.name === selectedTheme.name}/>
        ))}
      </div>
    </div>
  );
};
