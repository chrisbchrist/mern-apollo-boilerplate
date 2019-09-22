import React, { FunctionComponent } from "react";
import { Form, Input, Icon, Tooltip } from "antd";

export const InputField: FunctionComponent<any> = ({
  field,
  form: { errors, touched, handleBlur },
  layout,
  info,
  label,
  icon,
                                                   wrapperStyle,
  noValidate,
  ...rest
}) => {
  //This could be easier to read
  const validateStatus = noValidate
    ? null
    : touched[field.name]
    ? errors[field.name]
      ? "error"
      : noValidate
      ? null
      : "success"
    : "";

  const suffix: any = info ? (
    <Tooltip title={info}>
      <Icon type="info-circle" style={{ color: "rgba(0,0,0,.45)" }} />
    </Tooltip>
  ) : null;

  return (
    <Form.Item
      {...layout}
      help={touched[field.name] && errors[field.name] && errors[field.name]}
      validateStatus={validateStatus}
      label={label}
      style={wrapperStyle}
      colon={false}
    >
      <Input
        value={field.value}
        name={field.name}
        onChange={field.onChange}
        onBlur={handleBlur}
        size="large"
        suffix={info && suffix}
        prefix={
          icon ? <Icon type={icon} style={{ color: "rgba(0,0,0,.25)" }} /> : ""
        }
        type={
          field.name == "password" || field.name == "confirm" ? "password" : ""
        }
        placeholder={label}
        {...rest}
      />
    </Form.Item>
  );
};
