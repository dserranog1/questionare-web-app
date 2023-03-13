import { Button, Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import { FormValue } from "../types/forms";
import InputPasswordField from "./InputPasswordField";
import { emailRegex } from "./misc/regex";
import InputEmailField from "./InputEmailField";

const LoginPage = () => {
  const initialValues: FormValue = {
    email: "",
    password: "",
  };
  const SignUpSchema = object({
    email: string()
      .email("Correo inválido")
      .required("El correo es obligatorio")
      .matches(emailRegex, "Correo invalido"),
    password: string()
      .required("La contraseña es obligatoria")
      .min(8, "Mínimo 8 cáracteres"),
  });
  return (
    <div className="flex h-full flex-col items-center justify-center gap-20">
      <p className="text-4xl text-slate-700">Ingresa para continuar</p>
      <Card variant="elevated" size="lg">
        <CardHeader pb="1">
          <Heading size="s">Ingresa tus credenciales</Heading>
        </CardHeader>
        <CardBody>
          <Formik
            validationSchema={SignUpSchema}
            initialValues={initialValues}
            onSubmit={(e) => {
              console.log(e);
            }}
          >
            {({ touched, isValid }) => (
              <Form className="flex w-72 flex-col gap-6">
                <InputEmailField />
                <InputPasswordField />
                <Button
                  isDisabled={!(isValid && touched.email && touched.email)}
                  type="submit"
                  colorScheme="blue"
                  variant="solid"
                >
                  Iniciar sesion
                </Button>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginPage;
