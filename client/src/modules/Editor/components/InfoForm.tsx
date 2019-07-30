import React, { useState, useContext, FunctionComponent } from "react";
import { Form, Input, Button } from "antd";
import { Formik, Form as FormikForm, Field, FormikProps } from "formik";
import * as yup from "yup";
import { Mutation, Query } from "react-apollo";
import { UPDATE_USER_INFO, GET_USER } from "../../../queries";
import { UserContext } from "../../../App";

const { TextArea } = Input;

interface IUserInfo {
  name: string;
  profilePhoto: string;
  location: string;
  about: string;
  email: string;
  phone: string;
  github: string;
}

export const InfoForm: FunctionComponent<any> = () => {
  const authUser = useContext(UserContext);

  const initialValues = {
    name: "",
    profilePhoto: "",
    location: "",
    about: "",
    email: "",
    phone: "",
    github: ""
  };

  return (
      <Query query={GET_USER}>
          {({ loading, error, data, refetch }: any) => (
              <Mutation mutation={UPDATE_USER_INFO}>
                  {(updateUserInfo: any) => (
                      <div className="info__wrapper">
                          <div>
                              <Formik
                                  initialValues={initialValues}
                                  onSubmit={(values, actions) => {
                                      setTimeout(() => {
                                          alert(JSON.stringify(values, null, 2));
                                          updateUserInfo({
                                              variables: { userInfo: values, id: authUser.id }
                                          });

                                          actions.setSubmitting(false);
                                      }, 1000);
                                  }}
                                  render={(props: FormikProps<IUserInfo>) => (
                                      <form onSubmit={props.handleSubmit}>
                                          <Form.Item label="Name">
                                              <Input
                                                  onChange={props.handleChange}
                                                  onBlur={props.handleBlur}
                                                  value={props.values.name}
                                                  name="name"
                                                  placeholder="Name"
                                              />
                                          </Form.Item>
                                          <Form.Item label="Profile Photo">
                                              <Input
                                                  onChange={props.handleChange}
                                                  onBlur={props.handleBlur}
                                                  value={props.values.name}
                                                  name="profilePhoto"
                                                  placeholder="Profile picture URL"
                                              />
                                          </Form.Item>
                                          <Form.Item label="Location">
                                              <Input
                                                  onChange={props.handleChange}
                                                  onBlur={props.handleBlur}
                                                  value={props.values.name}
                                                  name="location"
                                                  placeholder="Location, e.g. San Francisco"
                                              />
                                          </Form.Item>
                                          <Form.Item label="About Me">
                                              <TextArea
                                                  onChange={props.handleChange}
                                                  onBlur={props.handleBlur}
                                                  value={props.values.name}
                                                  autosize={{ minRows: 3, maxRows: 6 }}
                                                  name="about"
                                                  placeholder="Give a brief overview of who you are and what you're all about!"
                                              />
                                          </Form.Item>
                                          <Form.Item label="E-mail Address">
                                              <Input
                                                  onChange={props.handleChange}
                                                  onBlur={props.handleBlur}
                                                  value={props.values.name}
                                                  name="email"
                                                  placeholder="E-mail, e.g. jesus@heaven.gov"
                                              />
                                          </Form.Item>
                                          <Form.Item label="Phone">
                                              <Input
                                                  onChange={props.handleChange}
                                                  onBlur={props.handleBlur}
                                                  value={props.values.name}
                                                  name="phone"
                                                  placeholder="(123)-555-1234"
                                              />
                                          </Form.Item>
                                          <Form.Item label="Github Profile">
                                              <Input
                                                  onChange={props.handleChange}
                                                  onBlur={props.handleBlur}
                                                  value={props.values.name}
                                                  name="github"
                                                  placeholder="Link to your Github"
                                              />
                                          </Form.Item>
                                          {props.errors.name && (
                                              <div id="feedback">{props.errors.name}</div>
                                          )}
                                          <Button
                                              htmlType="submit"
                                              type="primary"
                                              shape="round"
                                              icon="save"
                                              size="large"
                                          >
                                              Save
                                          </Button>
                                      </form>
                                  )}
                              />
                          </div>
                      </div>
                  )}
              </Mutation>
          )}

      </Query>
  );
};
