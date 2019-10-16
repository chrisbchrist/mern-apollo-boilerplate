import {notification} from "antd";

export const openNotificationWithIcon = (
    type: "success" | "error" | "info" | "warning",
    message: string,
    description: string
) => {
    notification[type]({ message, description });
};

export const fonts: string[] = [
    "Raleway",
    "Oswald",
    "Cutive Mono",
    "Roboto",
    "Open Sans Condensed",
    "Ubuntu",
    "Shadows Into Light",
    "Lobster"
];

// Transforms array of hex colors into comma separated values to insert into CSS gradient
export const formatColors: (colors: string[]) => string = colors => {
    let output: string = "";
    if (colors.length === 1) {
        return colors[0];
    }
    for (let i = 0; i < colors.length; i++) {
        if (i === colors.length - 1) {
            output += colors[i];
        } else {
            output += `${colors[i]}, `;
        }
    }
    return output;
};