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
import { emailRegex } from "../misc/regex";
import InputEmailField from "./InputEmailField";
import astronaut from "../assets/astronaut.png";
import { client } from "../untypeable/client";
import { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);
  const handleLogin = async (e: FormValue) => {
    try {
      const response = await client("/api/v1/login", "POST", {
        email: e.email,
        password: e.password,
      });
      if (response.state) {
        setCurrentUser({
          id: response.id,
          name: response.name,
          role: response.role,
        });
        toast({
          description: response.message,
          status: "success",
          duration: 2000,
          position: "top-right",
          isClosable: true,
        });
        navigate("/dashboard");
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
    <div className="mt-8 flex h-full flex-row items-center justify-around">
      <img
        className="w-4/12 rounded-md border-8 border-solid border-black"
        src={astronaut}
        alt="Astronaut thinking"
      />
      <Card
        variant="elevated"
        size="lg"
        border="2px"
        borderColor="cool-grey-100"
      >
        <CardHeader pb="1">
          <Heading
            fontSize="6"
            fontWeight="medium"
            textColor="cool-grey-800"
            textAlign="center"
          >
            Ingresa tus credenciales
          </Heading>
        </CardHeader>
        <CardBody>
          <Formik
            validationSchema={SignUpSchema}
            initialValues={initialValues}
            onSubmit={handleLogin}
          >
            {({ touched, isValid, isSubmitting }) => (
              <Form className="flex flex-col gap-6">
                <InputEmailField />
                <InputPasswordField />
                <Button
                  isDisabled={!(isValid && touched.email && touched.email)}
                  type="submit"
                  bgColor="light-blue-vivid-500"
                  textColor="cool-grey-050"
                  _hover={{ bgColor: "light-blue-vivid-800" }}
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
  );
};

export default LoginPage;
