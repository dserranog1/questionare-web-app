import { Button, Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import { useFormik } from "formik";

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {
      //handle submit
    },
  });
  return (
    <div className="flex h-full flex-col items-center justify-center gap-20">
      <p className="text-4xl text-slate-700">Ingresa para continuar</p>
      <div className="flex flex-col">
        <Card variant="elevated" size="lg">
          <CardHeader pb="1">
            <Heading size="s">Ingresa tus credenciales</Heading>
          </CardHeader>
          <CardBody>
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-3"
              id="loginForm"
            >
              <div className="flex flex-row justify-between">
                <label htmlFor="email">Email</label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.email} //TODO validation
                  id="email"
                  name="email"
                  type="email"
                  className="focus:border- rounded-md border-2 border-blue-400 focus:bg-blue-200 focus:outline-none"
                />
              </div>
              <div className="flex flex-row justify-between gap-4">
                <label htmlFor="password" className="">
                  Password
                </label>
                <input //TODO validation
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  id="password"
                  name="password"
                  type="password"
                  className="rounded-md border-2 border-blue-200 focus:border-blue-400 focus:bg-blue-200 focus:outline-none"
                />
              </div>
              <Button colorScheme="blue" variant="solid">
                Iniciar sesion
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
