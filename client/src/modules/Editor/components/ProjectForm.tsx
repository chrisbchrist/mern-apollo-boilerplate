import React, { FunctionComponent } from "react";
import { Modal, Form as AntdForm, Button } from "antd";
import { Formik, Form, Field, FieldArray, FormikActions } from "formik";
import { InputField } from "../../common/components/InputField";
import { EditableTagGroup } from "./EditableTagGroup";
import { Mutation } from "react-apollo";
import { ADD_PROJECT } from "../../../queries"

interface ProjectFormProps {
  modalVisibility: boolean;
  toggleModal: any;
  projectToEdit?: any;
  authUser: any;
}

interface ProjectFormValues {
  title: string;
  imgUrl: string;
  desc: string;
  tags: string[];
}

export const ProjectForm: FunctionComponent<ProjectFormProps> = ({
  modalVisibility,
  toggleModal,
    authUser
}) => {
  const initialValues: ProjectFormValues = {
    title: "",
    imgUrl: "",
    desc: "",
    tags: []
  };

  return (
    <Mutation mutation={ADD_PROJECT} ignoreResults>
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

              console.log(values);
              addProject({ variables: { project: values }})
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
                <Button icon="close-circle" style={{ marginRight: 15 }} onClick={toggleModal}>Cancel</Button>
                <Button type="primary" icon="plus" htmlType="submit">Add</Button>
              </div>
            </Form>
          </Formik>
        </Modal>
      )}
    </Mutation>
  );
};
