import React, { FunctionComponent } from 'react';
import { Form, Input, Icon } from 'antd';

export const InputField: FunctionComponent<any> = ({
  field,
  form: { errors, touched, handleBlur },
  label,
  icon,
    noValidate,
    ...rest
}) => {
  const validateStatus = noValidate ? null : touched[field.name] ? (errors[field.name] ? 'error' : 'success') : '';
  return (
    <Form.Item
      hasFeedback
      help={touched[field.name] && errors[field.name] && errors[field.name]}
      validateStatus={
        validateStatus
      }
      label={label}
    >
      <Input
        value={field.value}
        name={field.name}
        onChange={field.onChange}
        onBlur={handleBlur}
        size="large"
        prefix={
          icon ? <Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} /> : ''
        }
        type={
          field.name == 'password' || field.name == 'confirm' ? 'password' : ''
        }
        placeholder={label}
        {...rest }
      />
    </Form.Item>
  );
};
