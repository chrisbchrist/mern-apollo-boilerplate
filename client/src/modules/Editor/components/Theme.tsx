import React, { FunctionComponent } from "react";
import { Button, Icon, Popover } from "antd";

interface ThemeProps {
  theme: {
    name: string;
    img: string;
    desc: string;
    link: string;
    displayName?: string;
  };
  onClick: any;
  selected: boolean;
}

export const Theme: FunctionComponent<ThemeProps> = ({
  theme: { name, img, desc, link, displayName },
  selected,
    onClick
}) => {
  const popOverContent = (
    <div className="theme__popover">
      <p className="theme__desc">{desc}</p>
      <a target="_blank" href={link}>
        {" "}
        <Button type="primary" ghost>
          Preview
        </Button>
      </a>
    </div>
  );

  return (
    <Popover content={popOverContent} title={displayName ? displayName : name} style={{ width: 300 }} placement="right">
      <div
        className={
          selected
            ? "theme__wrapper theme__wrapper--selected"
            : "theme__wrapper"
        }
        onClick={onClick}
      >
          <Icon type="check-circle" theme="twoTone" className="theme__check" />
        <div className="theme__header"><h4 className="theme__name">{displayName ? displayName : name}</h4></div>
        <div className="theme__img-wrapper">
          <img src={img} className="theme__img" />
        </div>
      </div>
    </Popover>
  );
};
