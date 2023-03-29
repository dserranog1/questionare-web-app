import { Card, CardBody, CardHeader } from "@chakra-ui/react";
import { Formik } from "formik";
import { SignUpValues } from "../types/forms";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "../services/pocketbase";
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";
import { SignUpSchema } from "../schemas";
import { useContext } from "react";
import { DisclosuresContext } from "../providers/DisclosuresProvider";
import SubmitButton from "./forms/items/SubmitButton";
import StudentsAddForm from "./forms/StudentsAddForm";

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

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { successfullDisclosure, errorDisclosure, setMessage } =
    useContext(DisclosuresContext);

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
    <div className="my-6 flex flex-1 items-center justify-center">
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
                  onSuccess: () => {
                    setMessage("Estudiante creado con éxito");
                    successfullDisclosure.onOpen();
                    navigate("/dashboard/students");
                  },
                  onError: () => {
                    setMessage("Error al crear el estudiante");
                    errorDisclosure.onOpen(); //TODO write meaninfull error message
                  },
                }
              );
              console.log("submiting");
            }}
          >
            {({ isValid, errors, touched }) => (
              <StudentsAddForm errors={errors}>
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
              </StudentsAddForm>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
};

export default DashboardAddStudent;
