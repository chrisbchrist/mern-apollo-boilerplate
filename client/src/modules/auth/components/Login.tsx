import React, { useState, FunctionComponent } from 'react';
import { Form as AntdForm, Icon, Input, Button, Checkbox } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { withLogin } from '../providers/withLogin';
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

interface ILogin {
  email: string;
  password: string;
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
    .required()
});

const initialValues = {
  email: '',
  password: ''
};



const LoginForm: FunctionComponent<any> = ({ login, authUser, setAuthUser }) => {
    const onSubmit =  (values: ILogin, actions: FormikActions<ILogin>) => {
        actions.setSubmitting(true);
        actions.validateForm().then(res => {
            const { email, password } = values;
            login(email, password).then((res: any) => {
                console.log(res);
                const user = res.data.login;
                const token = user.token;
                localStorage.setItem('token', token);

                setAuthUser({ email: user.email, id: user._id})

            });
        });
        actions.setSubmitting(false);
    };

    if (authUser) {
        return <Redirect to="/"/>
    }

  return (
    <div className="login__wrapper">
      <h2 className="login__title">Log In</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={onSubmit}
        render={(formikBag: FormikProps<ILogin>) => (
          <Form>
            <Field
              name="email"
              render={({ field, form }: FieldProps<ILogin>) => (
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
              render={({ field, form }: FieldProps<ILogin>) => (
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
            <AntdForm.Item>
              <Checkbox>Remember me</Checkbox>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <Link to="/register">register now!</Link>
            </AntdForm.Item>
          </Form>
        )}
      />
    </div>
  );
};

export default withLogin(LoginForm);
