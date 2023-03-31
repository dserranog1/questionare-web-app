import { Card, CardBody, CardHeader } from "@chakra-ui/react";
import { Formik } from "formik";
import { RegisterQuestionValues } from "../types/forms";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "../services/pocketbase";
import { useNavigate } from "react-router-dom";
import { RegisterQuestionSchema } from "../schemas";
import { useContext } from "react";
import { DisclosuresContext } from "../providers/DisclosuresProvider";
import SubmitButton from "./forms/items/SubmitButton";
import QuestionsForm from "./forms/QuestionsForm";
import { Answer, Question } from "../types/questions";
import { createId } from "../utils/common";

const DashboardAddQuestion = () => {
  const initialValues: RegisterQuestionValues = {
    title: "",
    answers: [
      { description: "", correct: false, id: createId() },
      { description: "", correct: false, id: createId() },
      { description: "", correct: false, id: createId() },
      { description: "", correct: false, id: createId() },
    ],
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { successfullDisclosure, errorDisclosure, setMessage } =
    useContext(DisclosuresContext);

  const createAnswer = useMutation({
    mutationFn: (data: { questionId: string; answer: Omit<Answer, "id"> }) => {
      return pb
        .collection("answers")
        .create<Answer>(
          { question: data.questionId, ...data.answer },
          { $autoCancel: false }
        );
    },
    onError: () => {
      // empty on purpose
    },
  });

  // TODO handle errors when either question or answer creation fails
  // the idea is that if the question creation fails, stay on add, but if
  // the question is created but the answers fail, redirect to edit

  const createQuestion = useMutation({
    mutationFn: async (data: RegisterQuestionValues) => {
      const { id: questionId } = await pb
        .collection("questions")
        .create<Question>({ title: data.title });
      return Promise.all(
        data.answers.map((answer) =>
          createAnswer.mutateAsync({ questionId, answer })
        )
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["questions"] }),
    onError: () => {
      // empty on purpose
    },
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
            }}
          >
            {({ isValid, errors, touched, values }) => (
              <QuestionsForm errors={errors} values={values}>
                <SubmitButton
                  buttonText="Crear"
                  isSubmitting={createQuestion.isLoading}
                  isDisabled={
                    !isValid ||
                    !touched.answers?.some(
                      (answer) => answer.description === true
                    )
                  }
                />
              </QuestionsForm>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
};

export default DashboardAddQuestion;
