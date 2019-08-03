import React, { FunctionComponent, useState } from "react";
import {
  Modal,
  Form as AntdForm,
  Button,
  notification,
  Checkbox,
  Icon,
  Tooltip
} from "antd";
import { NotificationApi, ArgsProps } from "antd/lib/notification";
import {
  Formik,
  Form,
  Field,
  FieldArray,
  FormikActions,
  FormikFormProps
} from "formik";
import { InputField } from "../../common/components/InputField";
import { EditableTagGroup } from "./EditableTagGroup";
import { Mutation } from "react-apollo";
import { ADD_PROJECT, UPDATE_PROJECT } from "../../../queries";
import { ApolloQueryResult } from "apollo-client";
import { Project } from "../../../types";
import { ProjectsQueryVars } from "../containers/ProjectsContainer";
import { TextAreaField } from "../../common/components/TextAreaField";

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
  user?: string;
  title: string;
  imgUrl: string;
  desc: string;
  tags: string[];
  demoUrl?: string;
  srcUrl?: string;
}

const openNotificationWithIcon = (
  type: "success" | "error" | "info" | "warning",
  message: string,
  description: string
) => {
  notification[type]({ message, description });
};

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

export const ProjectForm: FunctionComponent<ProjectFormProps> = ({
  modalVisibility,
  toggleModal,
  authUser,
  refetchProjects,
  projectToEdit
}) => {

  const [sourcePrivate, setSourcePrivate] = useState<boolean>(false);

  const initialValues: ProjectFormValues = {
    title: "",
    imgUrl: "",
    desc: "",
    tags: []
  };

  return (
    <Mutation
      mutation={projectToEdit ? UPDATE_PROJECT : ADD_PROJECT}
      ignoreResults
      onCompleted={(data: Array<Project>) => {
        refetchProjects().then(
          (res: ApolloQueryResult<{ projects: Array<Project> }>) => {
            const msg: string = projectToEdit
              ? "Project updated!"
              : "Project added!";
            openNotificationWithIcon("success", msg, null);
          }
        );
      }}
    >
      {(upsertProject: any) => {
        let projectEditValues: ProjectFormValues | undefined = undefined;
        if (projectToEdit) {
          const { title, imgUrl, desc, tags } = projectToEdit;
          projectEditValues = { title, imgUrl, desc, tags };
        }
        return (
          <Modal
            visible={modalVisibility}
            title={
              projectToEdit ? (
                <span className="projects-modal__title">Edit Project</span>
              ) : (
                <span className="projects-modal__title">
                  Add a New Project!
                </span>
              )
            }
            okText="Create"
            width={600}
            onCancel={toggleModal}
            onOk={() => console.log("OK")}
            footer={null}
          >
            <Formik
              onSubmit={(
                values: ProjectFormValues,
                actions: FormikActions<ProjectFormValues>
              ) => {
                values.user = authUser.id;
                if (sourcePrivate) values.srcUrl = "Private";
                //console.log(values);

                if (projectToEdit) {
                  upsertProject({
                    variables: { project: values, id: projectToEdit._id }
                  });
                } else {
                  upsertProject({ variables: { project: values } });
                }

                actions.setSubmitting(false);
                toggleModal();
                actions.resetForm();
              }}
              enableReinitialize={true}
              initialValues={
                projectEditValues ? projectEditValues : initialValues
              }
            >
              {(formikProps: any) => {
                const onCheck = (e: any) => {
                  console.log(e.target.checked);
                  setSourcePrivate(e.target.checked);
                };

                return (
                  <Form>
                    <Field
                      //layout={formItemLayout}
                      noValidate={true}
                      name="title"
                      //label="Title"
                      component={InputField}
                      placeholder="Project name"
                    />
                    <Field
                      //layout={formItemLayout}
                      noValidate={true}
                      name="imgUrl"
                      //label="Image"
                      component={InputField}
                      placeholder="Image URL for screenshot, logo, etc."
                    />
                    <Field
                      //layout={formItemLayout}
                      noValidate={true}
                      name="desc"
                      label="Description"
                      component={TextAreaField}
                      autosize={{ minRows: 3, maxRows: 6 }}
                      placeholder="What is it? How and why did you build it? What skills did you apply/learn?"
                    />
                    <Field
                      //layout={formItemLayout}
                      noValidate={true}
                      name="demoUrl"
                      //label="Project URL"
                      component={InputField}
                      placeholder="Project URL"
                      info="Link to the project or a live demo"
                    />
                    <Field
                      //layout={formItemLayout}
                      noValidate={true}
                      name="srcUrl"
                      placeholder="Source URL"
                      //label="Project Source"
                      component={InputField}
                      wrapperStyle={{ marginBottom: 10 }}
                      disabled={sourcePrivate}
                      value={sourcePrivate ? "Private" : formikProps.values.srcUrl}
                      info="Link to Github or another way to view the source code"
                    />
                    <Checkbox style={{ marginBottom: 10 }} onChange={onCheck}>
                      Source Private
                      <Tooltip title="This is proprietary code made for an employer/client">
                        <Icon
                          type="info-circle"
                          style={{ color: "rgba(0,0,0,.45)", marginLeft: 10 }}
                        />
                      </Tooltip>
                    </Checkbox>
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
                      <Button
                        type="primary"
                        icon={projectToEdit ? "enter" : "plus"}
                        htmlType="submit"
                      >
                        {projectToEdit ? "Update" : "Add"}
                      </Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </Modal>
        );
      }}
    </Mutation>
  );
};
