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
    "Shadows Into Light"
];