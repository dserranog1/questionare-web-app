import { Card, CardBody, CardHeader } from "@chakra-ui/react";
import { Formik } from "formik";
import { RegisterQuestionValues, SignUpValues } from "../types/forms";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "../services/pocketbase";
import { useNavigate } from "react-router-dom";
import { RegisterQuestionSchema, SignUpSchema } from "../schemas";
import { useContext, useState } from "react";
import { DisclosuresContext } from "../providers/DisclosuresProvider";
import SubmitButton from "./forms/items/SubmitButton";
import QuestionsAddForm from "./forms/QuestionsAddForm";
import { Answer, Question } from "../types/questions";

const DashboardAddQuestion = () => {
  const initialValues: RegisterQuestionValues = {
    title: "",
    answers: [
      { description: "", correct: false },
      { description: "", correct: false },
      { description: "", correct: false },
      { description: "", correct: false },
    ],
  };

  const [correctOption, setCorrectOption] = useState("0");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { successfullDisclosure, errorDisclosure, setMessage } =
    useContext(DisclosuresContext);

  const createAnswer = useMutation({
    mutationFn: (data: { questionId: string; answer: Answer }) => {
      return pb
        .collection("answers")
        .create<Answer>(
          { field: data.questionId, ...data.answer },
          { $autoCancel: false }
        );
    },
  });

  const createQuestion = useMutation({
    mutationFn: async (data: RegisterQuestionValues) => {
      const { id: questionId } = await pb
        .collection("questions")
        .create<Question>({ title: data.title });
      return Promise.all(
        data.answers.map((answer) =>
          createAnswer.mutate({ questionId, answer })
        )
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["questions"] }),
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
          Crear nueva pregunta
        </CardHeader>
        <CardBody>
          <Formik
            validationSchema={RegisterQuestionSchema}
            initialValues={initialValues}
            onSubmit={(data: RegisterQuestionValues) => {
              createQuestion.mutate(
                { ...data },
                {
                  onSuccess: () => {
                    setMessage("Pregunta creada con éxito");
                    successfullDisclosure.onOpen();
                    navigate("/dashboard/questions");
                  },
                  onError: () => {
                    setMessage("Error al crear la pregunta");
                    errorDisclosure.onOpen(); //TODO write meaninfull error message
                  },
                }
              );
              data.answers[+correctOption].correct = true;
              console.log("submiting", data);
            }}
          >
            {({ isValid, errors, touched, values }) => (
              <QuestionsAddForm
                errors={errors}
                values={values}
                correctOption={correctOption}
                setCorrectOption={setCorrectOption}
              >
                <SubmitButton
                  buttonText="Crear"
                  //   isSubmitting={createUser.isLoading}
                  isSubmitting={false}
                  isDisabled={
                    !isValid ||
                    !touched.answers?.some(
                      (answer) => answer.description === true
                    )
                  }
                />
              </QuestionsAddForm>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
};

export default DashboardAddQuestion;