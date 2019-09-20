import React, { FunctionComponent } from "react";
import { Button } from "antd";

interface ThemeProps {
  theme: {
    name: string;
    img: string;
    desc: string;
    link: string;
  };
}

export const Theme: FunctionComponent<ThemeProps> = ({
  theme: { name, img, desc, link }
}) => {
  return (
    <div className="theme__wrapper">
      <h4 className="theme__name">{name}</h4>
      <img src={img} className="theme__img" />
      <p className="theme__desc">{desc}</p>
      <a target="_blank" href={link}>
        {" "}
        <Button type="primary" ghost>Preview</Button>
      </a>
    </div>
  );
};
