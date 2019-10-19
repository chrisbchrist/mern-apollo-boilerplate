import React, {
  FunctionComponent,
  useState,
  useContext,
  useEffect,
  createContext
} from "react";
import { ColorPicker } from "./style_options/ColorPicker";
import { FontSelect } from "./style_options/FontSelect";
import { PhotoPicker } from "./style_options/PhotoPicker/PhotoPicker";
import { useQuery, useMutation } from "@apollo/react-hooks";
import "./StyleMenu.css";
import { UserContext } from "../../../App";
import { EditorContext } from "../containers/EditorContainer";
import { UPDATE_USER_STYLES, GET_USER_AND_PROJECTS } from "../../../queries";
import { Select, Divider, Icon, Slider, Collapse } from "antd";
import client from "../../../config/createApolloClient";
import { FetchResult } from "react-apollo";
import { Theme } from "./Theme";
import { fonts } from "../../common";
import { GradientPicker, Gradient } from "./style_options/GradientPicker/GradientPicker";
import {Header} from "../../../types";

const { Option } = Select;

const themes = [
  {
    name: "Basic",
    img:
      "https://res.cloudinary.com/dgeb3iekh/image/upload/c_scale,w_470/v1568942227/basic_ei3qre.png",
    desc:
      "This is your classic, clean portfolio that sacrifices fancy-shmancy bells and whistles for ruthless, professional efficency.",
    link: "#"
  },
  {
    name: "Modern",
    displayName: "Dynamic",
    img:
      "https://res.cloudinary.com/dgeb3iekh/image/upload/c_scale,w_470/v1568942227/basic_ei3qre.png",
    desc:
      "Modern design built for eye-catching individuality with a few simple customizations.",
    link: "#"
  }
];

//Create context with mutation to update styles from within any child component
export const StyleContext = createContext(null);

export const StyleMenu: FunctionComponent<any> = (props: any) => {
  // Import user ID for mutations & current styles from contexts
  const authUser = useContext(UserContext);
  const editorContext = useContext(EditorContext);

  const [selectedTheme, setSelectedTheme] = useState<any>(
    editorContext.styles.theme
      ? themes.filter(t => t.name === editorContext.styles.theme)[0]
      : themes[0]
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

  const [bgPhoto, setBgPhoto] = useState<string>(
    editorContext.styles.bgPhoto ? editorContext.styles.bgPhoto : null
  );

  const [gradient, setGradient] = useState<any>(editorContext.styles.gradient ? editorContext.styles.gradient : null);

  const [headerStyles, setHeaderStyles] = useState<Header>(editorContext.styles.header ? editorContext.styles.header : null);

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

  // Automatically send changes to database on each style change
  const saveStyles = () => {
    // Format input for GraphQL
    if (gradient) {
      if (gradient.opacity) {
        gradient.opacity = gradient.opacity.toString();
      }
      delete gradient.__typename;
    }
    const userStyles = {
      theme: selectedTheme.name,
      color,
      font,
      fontSize,
      bgPhoto,
      gradient
    };
    updateStyles({ variables: { userStyles, id: authUser.id } });
  };

  useEffect(() => {
    saveStyles();
  }, [color, font, selectedTheme, fontSize, bgPhoto, gradient]);

  const onChangeColor = (color: any) => {
    setColor(color.hex);
  };

  const onChangeFont = (val: string) => {
    //console.log(val);
    setFont(val);
  };

  const onChangeFontSize = (val: any) => {
    setFontSize(val);
  };

  const onChangeBgPhoto = (url: string) => {
    setBgPhoto(url);
  };

  const fontSizeFormatter = (val: number) => {
    return `${val}px`;
  };

  return (
    <div className="styles__wrapper">
      <Collapse onChange={(key) => console.log(key)}>
        <Collapse.Panel header="Header" key="1">
          <p>Header Stuff</p>
        </Collapse.Panel>
      </Collapse>
      <div
        className="styles__item-wrapper"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <ColorPicker color={color} onChange={onChangeColor} label="Color" />
        </div>
        <div>
          <FontSelect font={font} onChange={onChangeFont} options={fonts} />
        </div>
      </div>
      {selectedTheme.name === "Modern" && (
          <div className="styles__item-wrapper" style={{display: 'flex'}}>
          <PhotoPicker onChange={onChangeBgPhoto} />
          <GradientPicker setGradient={setGradient}/>
        </div>
      )}
      <div
        className="styles__item-wrapper styles__font-size-wrapper"
        style={{ borderBottom: "none" }}
      >
        <label className="styles__color-label ant-form-item-label">
          Font Size:
        </label>
        <Slider
          className="styles__font-slider"
          min={10}
          max={35}
          onChange={onChangeFontSize}
          tipFormatter={fontSizeFormatter}
          value={fontSize}
        />
      </div>

      <div className="styles__themes-wrapper">
        <Divider>
          <span className="styles__themes-title">Themes</span>
        </Divider>
        {themes.map((theme, i) => (
          <Theme
            key={theme.name}
            theme={theme}
            onClick={() => setSelectedTheme(themes[i])}
            selected={theme.name === selectedTheme.name}
          />
        ))}
      </div>
    </div>
  );
};
