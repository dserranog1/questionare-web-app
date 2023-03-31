import { Form, type FormikErrors } from "formik";
import { FC, PropsWithChildren } from "react";
import { SignUpValues } from "../../types/forms";
import { documentTypes } from "../ui/StudentInfoModal";
import CustomInputField from "./items/CustomInputField";
import CustomSelectField from "./items/CustomSelectField";
import InputPasswordField from "./items/InputPasswordField";

interface Props {
  errors: FormikErrors<SignUpValues>;
}

const StudentsAddForm: FC<PropsWithChildren<Props>> = ({
  children,
  errors,
}) => {
  return (
    <Form className="flex flex-col gap-6">
      <CustomInputField
        type="email"
        name="email"
        label="Correo"
        errorMessage={errors.email}
        isRequired={true}
      />
      <InputPasswordField />
      <CustomInputField
        type="text"
        name="phone"
        label="Número de teléfono"
        errorMessage={errors.phone}
        isRequired={true}
      />
      <div className="flex flex-row gap-5">
        <CustomInputField
          type="text"
          name="firstName"
          label="Nombre"
          errorMessage={errors.firstName}
          isRequired={true}
        />
        <CustomInputField
          type="text"
          name="secondName"
          label="Segundo nombre"
          errorMessage={errors.secondName}
          isRequired={false}
        />
      </div>
      <div className="flex flex-row gap-5">
        <CustomInputField
          type="text"
          name="surname"
          label="Apellido"
          errorMessage={errors.surname}
          isRequired={true}
        />
        <CustomInputField
          type="text"
          name="secondSurName"
          label="Segundo apellido"
          errorMessage={errors.secondSurName}
          isRequired={false}
        />
      </div>
      <div className="flex flex-row gap-5">
        <CustomInputField
          type="text"
          name="documentNumber"
          label="Número de documento"
          errorMessage={errors.documentNumber}
          isRequired={true}
        />
        <CustomSelectField
          label="Tipo de documento"
          name="typeDocument"
          errorMessage={errors.typeDocument}
          placeholder="Seleccione uno"
          options={documentTypes}
        />
      </div>
      {children}
    </Form>
  );
};

export default StudentsAddForm;
