import { Card, CardBody, CardHeader } from "@chakra-ui/react";
import InputEmailField from "./InputEmailField";
import { Form, Formik } from "formik";
import { FormValue } from "../types/forms";
import InputPasswordField from "./InputPasswordField";

const DashboardAddStudent = () => {
  const initialValues: FormValue = {
    email: "",
    password: "",
  };
  return (
    <div className="bg-cool-grey-050">
      <Card
        variant="elevated"
        size="lg"
        border="2px"
        borderColor="cool-grey-100"
        bgColor="cool-grey-050"
      >
        <CardHeader textColor="cool-grey-800" fontWeight="bold" fontSize="6">
          Crear nuevo estudiante
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={initialValues}
            onSubmit={() => {
              console.log("submiting");
            }}
          >
            {({ touched, isValid, isSubmitting }) => (
              <Form className="flex flex-col gap-6">
                <InputEmailField />
                <InputPasswordField />
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
};

export default DashboardAddStudent;
