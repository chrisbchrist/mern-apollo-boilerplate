import React, { FunctionComponent } from "react";
import { Modal, Form as AntdForm } from "antd";
import { Formik, Form, Field, FieldArray, FormikActions } from "formik";
import { InputField } from "../../common/components/InputField";
import { EditableTagGroup} from "./EditableTagGroup";

interface ProjectFormProps {
  modalVisibility: boolean;
  toggleModal: any;
  projectToEdit?: any;
}

interface ProjectFormValues {
  title: string;
  imgUrl: string;
  description: string;
  tags: string[];
}

export const ProjectForm: FunctionComponent<ProjectFormProps> = ({
  modalVisibility,
  toggleModal
}) => {
  const initialValues: ProjectFormValues = {
    title: "",
    imgUrl: "",
    description: "",
    tags: []
  };

  return (
    <Modal
      visible={modalVisibility}
      title="Add a New Project!"
      okText="Create"
      onCancel={toggleModal}
      onOk={() => console.log("OK")}
    >
      <Formik
        onSubmit={(values: ProjectFormValues, actions: FormikActions<ProjectFormValues>) => {
          console.log(values);
        }}
        enableReinitialize={true}
        initialValues={initialValues}
      >
        <Form>
          <Field noValidate={true} name="title" label="Title" component={InputField} />
          <Field noValidate={true} name="imgUrl" label="Image URL" component={InputField} />
          <Field
            noValidate={true} name="description"
            label="Description"
            component={InputField}
          />
          <AntdForm.Item label="Tags">
          <FieldArray name="tags" component={EditableTagGroup}/>
          </AntdForm.Item>
        </Form>
      </Formik>
    </Modal>
  );
};
