import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import { SignInValues } from "../types/forms";
import InputPasswordField from "./InputPasswordField";
import { emailRegex } from "../misc/regex";
import astronaut from "../assets/astronaut.png";
import { client } from "../untypeable/client";
import { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import CustomInputField from "./CustomInputField";
import SubmitButton from "./SubmitButton";

const LoginPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);
  const handleLogin = async (e: SignInValues) => {
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

  const initialValues: SignInValues = {
    email: "",
    password: "",
  };
  const SignInSchema = object({
    email: string()
      .email("Correo inválido")
      .required("El correo es obligatorio")
      .matches(emailRegex, "Correo invalido"),
    password: string()
      .required("La contraseña es obligatoria")
      .min(8, "Mínimo 8 cáracteres"),
  });
  return (
    <div className="flex flex-1 flex-row items-center justify-around">
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
            validationSchema={SignInSchema}
            initialValues={initialValues}
            onSubmit={handleLogin}
          >
            {({ isValid, isSubmitting, errors, touched }) => (
              <Form className="flex flex-col gap-6">
                <CustomInputField
                  type="email"
                  name="email"
                  label="Correo"
                  errorMessage={errors.email}
                />
                <InputPasswordField />
                <SubmitButton
                  buttonText="Ingresar"
                  isSubmitting={isSubmitting}
                  isDisabled={!isValid || !(touched.email || touched.password)}
                />
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginPage;
