import React, { useState, FunctionComponent } from 'react';
import { Form as AntdForm, Icon, Input, Button, Checkbox } from 'antd';
import {
  Formik,
  Field,
  Form,
  FormikActions,
  FormikProps,
  FieldProps
} from 'formik';
import * as yup from 'yup';
import '../styles/styles.css';
import { InputField } from '../../common/components/InputField';
import { UserInput } from '../../../../../types';
import { withSignUp } from '../providers';
import { RouteComponentProps } from 'react-router-dom';

interface SignUpProps {
    createUser: (userInput: UserInput) => any;
    setAuthUser: any;
}



interface IRegister {
  email: string;
  password: string;
  confirm: string;
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('You must enter a valid e-mail address.')
    .min(6)
    .max(50)
    .required(),
  password: yup
    .string()
    .min(5, 'Passwords must be 5-40 characters.')
    .max(40, 'Passwords must be 5-40 characters.')
    .required(),
  confirm: yup
    .string()
    .min(5, 'Passwords must be 5-40 characters.')
    .max(40, 'Passwords must be 5-40 characters.')
    .required()
});

const initialValues = {
  email: '',
  password: '',
  confirm: ''
};

const SignUpForm: FunctionComponent<SignUpProps & RouteComponentProps> = ({ createUser, setAuthUser }) => {

    const onSubmit = (values: IRegister, actions: FormikActions<IRegister>) => {
        actions.setSubmitting(true);
        actions.validateForm().then(res => {
            createUser(values).then((res: any) => {
                console.log(res);
                const user = res.data.createUser;
                const token = user.token;
                localStorage.setItem('token', token);

                setAuthUser({ email: user.email, id: user._id})

            });
        });
        console.log({ values, actions });
        actions.setSubmitting(false);
    };

  return (
      <div className="login__container">
    <div className="login__wrapper">
      <h2 className="login__title">Sign Up</h2>
        <div className="login__title-accent"/>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={onSubmit}
        render={(formikBag: FormikProps<IRegister>) => (
          <Form className="login__form">
            <Field
              name="email"
              render={({ field, form }: FieldProps<IRegister>) => (
                <AntdForm.Item
                  hasFeedback
                  help={
                    form.touched.email && form.errors.email && form.errors.email
                  }
                  validateStatus={
                    form.touched.email
                      ? form.errors.email
                        ? 'error'
                        : 'success'
                      : ''
                  }
                >
                  <Input
                    name={field.name}
                    value={field.value}
                    onBlur={form.handleBlur}
                    onChange={field.onChange}
                    size="large"
                    prefix={
                      <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="E-mail address"
                  />
                </AntdForm.Item>
              )}
            />
            <Field
              name="password"
              render={({ field, form }: FieldProps<IRegister>) => (
                <AntdForm.Item
                  hasFeedback
                  help={
                    form.touched.password &&
                    form.errors.password &&
                    form.errors.password
                  }
                  validateStatus={
                    form.touched.password
                      ? form.errors.password
                        ? 'error'
                        : 'success'
                      : ''
                  }
                >
                  <Input
                    value={field.value}
                    name={field.name}
                    onChange={field.onChange}
                    onBlur={form.handleBlur}
                    size="large"
                    prefix={
                      <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                </AntdForm.Item>
              )}
            />
            <Field
              name="confirm"
              render={({ field, form }: FieldProps<IRegister>) => {
                const fieldName = field.name as keyof typeof form.touched;

                return (
                  <AntdForm.Item
                    hasFeedback
                    help={
                      form.touched[fieldName] &&
                      form.errors[fieldName] &&
                      form.errors[fieldName]
                    }
                    validateStatus={
                      form.touched[fieldName]
                        ? form.errors[fieldName]
                          ? 'error'
                          : 'success'
                        : ''
                    }
                  >
                    <Input
                      value={field.value}
                      name={field.name}
                      onChange={field.onChange}
                      onBlur={form.handleBlur}
                      size="large"
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="password"
                      placeholder="Confirm password"
                    />
                  </AntdForm.Item>
                );
              }}
            />
            <AntdForm.Item>
              <Checkbox>Remember me</Checkbox>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </AntdForm.Item>
          </Form>
        )}
      />
    </div>
      </div>
  );
};

export default withSignUp(SignUpForm);
