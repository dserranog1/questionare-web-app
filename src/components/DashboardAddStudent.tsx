import { Card, CardBody, CardHeader } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import CustomInputField from "./CustomInputField";
import { SignUpValues } from "../types/forms";
import InputPasswordField from "./InputPasswordField";
import CustomSelectField from "./CustomSelectField";
import SubmitButton from "./SubmitButton";
import { number, object, string } from "yup";
import { emailRegex } from "../misc/regex";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { documentTypes } from "./DashboardStudents";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "../services/pocketbase";
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";

const DashboardAddStudent = () => {
  const initialValues: SignUpValues = {
    email: "",
    password: "",
    firstName: "",
    secondName: "",
    surname: "",
    secondSurName: "",
    typeDocument: "",
    documentNumber: "",
    phone: "",
  };

  const SignUpSchema = object({
    email: string()
      .email("Correo inválido")
      .required("El correo es obligatorio")
      .matches(emailRegex, "Correo invalido"),
    password: string()
      .required("La contraseña es obligatoria")
      .min(8, "Mínimo 8 cáracteres"),
    phone: number()
      .required("Campo obligatorio")
      .positive("Debe ser un número positivo")
      .typeError("Valor inválido"),
    firstName: string().required("Campo obligatorio"),
    surname: string().required("Campo obligatorio"),
    typeDocument: string().required("Selecciona una de las opciones"),
    documentNumber: number()
      .required("Campo obligatorio")
      .typeError("Valor inválido"),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createUser = useMutation({
    mutationFn: (data: SignUpValues) => {
      return pb.collection("users").create<User>({
        ...data,
        role: "estudiante",
        passwordConfirm: data.password,
        emailVisibility: true,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["students"] }),
  });
  return (
    <div className="mt-6 flex flex-1 items-center justify-center">
      <Card
        variant="elevated"
        size="lg"
        border="2px"
        borderColor="cool-grey-100"
        bgColor="cool-grey-050"
      >
        <PlusCircleIcon className="absolute top-0 left-0 -mt-6 w-8 fill-light-blue-vivid-300" />
        <CardHeader
          textColor="cool-grey-800"
          fontWeight="bold"
          fontSize="6"
          pb="0"
        >
          Crear nuevo estudiante
        </CardHeader>
        <CardBody>
          <Formik
            validationSchema={SignUpSchema}
            initialValues={initialValues}
            onSubmit={(data: SignUpValues) => {
              createUser.mutate(
                { ...data },
                {
                  onSuccess: () => navigate("/dashboard/students"), //TODO implement modals for user feedback
                  onError: () => console.log("error"),
                }
              );
              console.log("submiting");
            }}
          >
            {({ isValid, errors, touched }) => (
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
                    placeholder="Seleccione un tipo"
                    options={documentTypes}
                  />
                </div>
                <SubmitButton
                  buttonText="Crear"
                  isSubmitting={createUser.isLoading}
                  isDisabled={
                    !isValid ||
                    !(
                      touched.firstName ||
                      touched.secondName ||
                      touched.surname ||
                      touched.secondSurName ||
                      touched.documentNumber ||
                      touched.typeDocument
                    )
                  }
                />
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
};

export default DashboardAddStudent;
