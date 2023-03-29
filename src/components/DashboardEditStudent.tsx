import { Card, CardBody, CardHeader } from "@chakra-ui/react";
import { Formik } from "formik";
import { SignUpValues } from "../types/forms";
import { WrenchIcon } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { pb } from "../services/pocketbase";
import { User } from "../types/user";
import { useNavigate, useParams } from "react-router-dom";
import { SignUpSchema } from "../schemas";
import { useContext } from "react";
import { DisclosuresContext } from "../providers/DisclosuresProvider";
import SubmitButton from "./forms/items/SubmitButton";
import CustomSpinner from "./CustomSpinner";
import StudentsEditForm from "./forms/StudentsEditForm";
import { documentTypes } from "./StudentInfoModal";

const DashboardEditStudent = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const { successfullDisclosure, errorDisclosure, setMessage } =
    useContext(DisclosuresContext);
  const {
    status,
    error,
    data: student,
  } = useQuery({
    queryKey: ["students", studentId],
    queryFn: () => pb.collection("users").getOne<User>(studentId!),
  });

  const queryClient = useQueryClient();
  const editUser = useMutation({
    mutationFn: (data: SignUpValues) => {
      return pb.collection("users").update<User>(studentId!, {
        ...data,
        password: null,
        role: "estudiante",
        emailVisibility: true,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["students"] }),
  });
  if (status === "loading") {
    return <CustomSpinner />;
  }
  if (status === "error") {
    if (error instanceof Error) {
      return (
        <div>
          <p>{error.message}</p>
        </div>
      );
    } else {
      //this else prevents component to return undefined
      return <div>some error</div>; //TODO handle alll errors
    }
  }
  const initialValues: SignUpValues = {
    email: student.email,
    password: "placeholderforpassword",
    firstName: student.firstName,
    secondName: student.secondName || "",
    surname: student.surname,
    secondSurName: student.secondSurName || "",
    typeDocument: student.typeDocument,
    documentNumber: student.documentNumber,
    phone: student.phone,
  };

  const defaultSelectValue = documentTypes.find(
    (doc) => doc.value === initialValues.typeDocument
  );

  return (
    <div className="my-6 flex flex-1 items-center justify-center">
      <Card
        variant="elevated"
        size="lg"
        border="2px"
        borderColor="cool-grey-100"
        bgColor="cool-grey-050"
      >
        <WrenchIcon className="absolute top-0 left-0 -mt-6 w-8 fill-light-blue-vivid-300" />
        <CardHeader
          textColor="cool-grey-800"
          fontWeight="bold"
          fontSize="5"
          pb="0"
        >
          Editando a{" "}
          <span className="text-light-blue-vivid-600">
            {" "}
            {student.firstName +
              " " +
              student.secondName +
              " " +
              student.surname +
              " " +
              student.secondSurName}
          </span>
        </CardHeader>
        <CardBody>
          <Formik
            validationSchema={SignUpSchema}
            initialValues={initialValues}
            onSubmit={(data: SignUpValues) => {
              editUser.mutate(
                { ...data },
                {
                  onSuccess: () => {
                    setMessage("Estudiante actualizado con éxito");
                    successfullDisclosure.onOpen();
                    navigate("/dashboard/students");
                  },
                  onError: () => {
                    setMessage("Error al actualizar el estudiante");
                    errorDisclosure.onOpen(); //TODO write meaninfull error message
                  },
                }
              );
              console.log("submiting");
            }}
          >
            {({ isValid, errors }) => (
              <StudentsEditForm
                defaultSelectValue={defaultSelectValue}
                errors={errors}
              >
                <SubmitButton
                  buttonText="Guardar"
                  isSubmitting={editUser.isLoading}
                  isDisabled={!isValid}
                />
              </StudentsEditForm>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
};

export default DashboardEditStudent;
