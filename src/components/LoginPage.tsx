import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import { FormValue } from "../types/forms";
import InputPasswordField from "./InputPasswordField";
import { emailRegex } from "./misc/regex";
import InputEmailField from "./InputEmailField";
import astronaut from "../assets/astronaut.png";
import { client } from "../untypeable/client";

const LoginPage = () => {
  const toast = useToast();
  const handleLogin = async (e: FormValue) => {
    try {
      const response = await client("/api/v1/login", "POST", {
        email: e.email,
        password: e.password,
      });
      if (response.state) {
        toast({
          description: response.message,
          status: "success",
          duration: 2000,
          position: "top-right",
          isClosable: true,
        });
      } else {
        toast({
          description: response.message,
          status: "error",
          duration: 2000,
          position: "top-right",
          isClosable: true,
        });
      }
      console.log(response);
    } catch (error) {
      // TODO handle network error
      console.log(error);
    }
  };

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
    <div className="flex h-full flex-row items-center justify-between gap-20 pl-36 pr-52">
      <img
        className="w-3/6 rounded-md border-8 border-solid border-black"
        src={astronaut}
        alt="Astronaut thinking"
      />
      <div className="flex flex-col items-center justify-center gap-10">
        <p className="text-4xl text-slate-700">Inicia sesión para continuar</p>
        <Card variant="elevated" size="lg">
          <CardHeader pb="1">
            <Heading size="s">Ingresa tus credenciales</Heading>
          </CardHeader>
          <CardBody>
            <Formik
              validationSchema={SignUpSchema}
              initialValues={initialValues}
              onSubmit={handleLogin}
            >
              {({ touched, isValid, isSubmitting }) => (
                <Form className="flex w-80 flex-col gap-6">
                  <InputEmailField />
                  <InputPasswordField />
                  <Button
                    isDisabled={!(isValid && touched.email && touched.email)}
                    type="submit"
                    colorScheme="blue"
                    variant="solid"
                    isLoading={isSubmitting}
                  >
                    Ingresar
                  </Button>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
