import {notification} from "antd";

export const openNotificationWithIcon = (
    type: "success" | "error" | "info" | "warning",
    message: string,
    description: string
) => {
    notification[type]({ message, description });
};