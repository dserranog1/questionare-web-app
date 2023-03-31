import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { SignInValues } from "../types/forms";
import InputPasswordField from "./forms/items/InputPasswordField";
import astronaut from "../assets/astronaut.png";
import { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import CustomInputField from "./forms/items/CustomInputField";
import SubmitButton from "./forms/items/SubmitButton";
import { pb } from "../services/pocketbase";
import { User } from "../types/user";
import { useMutation } from "@tanstack/react-query";
import { SignInSchema } from "../schemas";

//TODO a useful feature would be to check that if a token already exists
// redirect the user to the dashboard

const LoginPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);
  const loginUser = useMutation({
    mutationFn: ({ email, password }: SignInValues) => {
      return pb.collection("users").authWithPassword<User>(email, password);
    },
    onSuccess: (data) => {
      setCurrentUser({
        ...data.record,
      });
    },
  });
  const handleLogin = async (data: SignInValues) => {
    loginUser.mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          // TODO handle onError
          toast({
            description: "Ingreso exitoso",
            status: "success",
            duration: 2000,
            position: "top-right",
            isClosable: true,
          });
          navigate("/dashboard");
        },
      }
    );
  };

  const initialValues: SignInValues = {
    email: "",
    password: "",
  };
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
            {({ isValid, errors, touched }) => (
              <Form className="flex flex-col gap-6">
                <CustomInputField
                  isRequired={true}
                  type="email"
                  name="email"
                  label="Correo"
                  errorMessage={errors.email}
                />
                <InputPasswordField />
                <SubmitButton
                  buttonText="Ingresar"
                  isSubmitting={loginUser.isLoading}
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
