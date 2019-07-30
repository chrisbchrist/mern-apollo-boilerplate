import React, { FunctionComponent } from "react";
import { Modal, Form as AntdForm, Button, notification } from "antd";
import { NotificationApi, ArgsProps } from 'antd/lib/notification';
import { Formik, Form, Field, FieldArray, FormikActions } from "formik";
import { InputField } from "../../common/components/InputField";
import { EditableTagGroup } from "./EditableTagGroup";
import { Mutation } from "react-apollo";
import { ADD_PROJECT } from "../../../queries";
import { ApolloQueryResult } from "apollo-client";
import { Project } from "../../../types";
import { ProjectsQueryVars } from "../containers/ProjectsContainer";

interface ProjectFormProps {
  modalVisibility: boolean;
  toggleModal: any;
  projectToEdit?: Project;
  authUser: any;
  refetchProjects: (
    variables?: ProjectsQueryVars
  ) => Promise<ApolloQueryResult<{ projects: Array<Project> }>>;
}

interface ProjectFormValues {
  userId?: string;
  title: string;
  imgUrl: string;
  desc: string;
  tags: string[];
}

const openNotificationWithIcon = (type: "success" | "error" | "info" | "warning", message: string, description: string) => {
  notification[type]({ message, description });
};

export const ProjectForm: FunctionComponent<ProjectFormProps> = ({
  modalVisibility,
  toggleModal,
  authUser,
  refetchProjects
}) => {

  const initialValues: ProjectFormValues = {
    title: "",
    imgUrl: "",
    desc: "",
    tags: []
  };

  return (
    <Mutation
      mutation={ADD_PROJECT}
      ignoreResults
      onCompleted={(data: Array<Project>) => {
        refetchProjects().then((res: ApolloQueryResult<{ projects: Array<Project> }>) => {
          openNotificationWithIcon('success', "Projected added!", null);
        });
      }}
    >
      {(addProject: any) => (
        <Modal
          visible={modalVisibility}
          title="Add a New Project!"
          okText="Create"
          onCancel={toggleModal}
          onOk={() => console.log("OK")}
          footer={null}
        >
          <Formik
            onSubmit={(
              values: ProjectFormValues,
              actions: FormikActions<ProjectFormValues>
            ) => {
              values.userId = authUser.id;
              console.log(values);
              addProject({ variables: { project: values } });
              actions.setSubmitting(false);
              actions.resetForm();
              toggleModal();
            }}
            enableReinitialize={true}
            initialValues={initialValues}
          >
            <Form>
              <Field
                noValidate={true}
                name="title"
                label="Title"
                component={InputField}
              />
              <Field
                noValidate={true}
                name="imgUrl"
                label="Image URL"
                component={InputField}
              />
              <Field
                noValidate={true}
                name="desc"
                label="Description"
                component={InputField}
              />
              <AntdForm.Item label="Tags">
                <FieldArray name="tags" component={EditableTagGroup} />
              </AntdForm.Item>
              <div className="projects-modal__footer">
                <Button
                  icon="close-circle"
                  style={{ marginRight: 15 }}
                  onClick={toggleModal}
                >
                  Cancel
                </Button>
                <Button type="primary" icon="plus" htmlType="submit">
                  Add
                </Button>
              </div>
            </Form>
          </Formik>
        </Modal>
      )}
    </Mutation>
  );
};
