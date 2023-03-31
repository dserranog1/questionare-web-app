import { Card, CardBody, CardHeader } from "@chakra-ui/react";
import { Formik } from "formik";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { pb } from "../services/pocketbase";
import { useNavigate, useParams } from "react-router-dom";
import { RegisterQuestionSchema } from "../schemas";
import { useContext, useState } from "react";
import { DisclosuresContext } from "../providers/DisclosuresProvider";
import SubmitButton from "./forms/items/SubmitButton";
import QuestionsForm from "./forms/QuestionsForm";
import { Answer, ExpandedQuestion, Question } from "../types/questions";
import CustomSpinner from "./ui/CustomSpinner";
import ErrorPage from "./ErrorPage";
import { RegisterQuestionValues } from "../types/forms";

const DashboardEditQuestion = () => {
  const { questionId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { successfullDisclosure, errorDisclosure, setMessage } =
    useContext(DisclosuresContext);

  const {
    status,
    error,
    data: question,
  } = useQuery({
    queryKey: ["questions", questionId],
    queryFn: () =>
      pb
        .collection("questions")
        .getFirstListItem<ExpandedQuestion>(`id="${questionId}"`, {
          expand: "answers(question)",
        }),
  });
  const editAnswer = useMutation({
    mutationFn: (data: { questionId: string; answer: Answer }) => {
      return pb
        .collection("answers")
        .update<Answer>(
          data.answer.id,
          { question: data.questionId, ...data.answer },
          { $autoCancel: false }
        );
    },
    onError: () => {},
  });
  const removeAnswer = useMutation({
    mutationFn: (data: { questionId: string; answer: Answer }) => {
      return pb
        .collection("answers")
        .delete(data.answer.id, { question: data.questionId, ...data.answer });
    },
    onError: () => {},
  });

  const createAnswer = useMutation({
    mutationFn: (data: { questionId: string; answer: Omit<Answer, "id"> }) => {
      return pb
        .collection("answers")
        .create<Answer>(
          { question: data.questionId, ...data.answer },
          { $autoCancel: false }
        );
    },
    onError: () => {},
  });

  // TODO handle errors when either question or answer creation fails
  // the idea is that if the question creation fails, stay on add, but if
  // the question is created but the answers fail, redirect to edit

  const editQuestion = useMutation({
    mutationFn: async (data: RegisterQuestionValues) => {
      console.log({ data });
      const { id } = await pb
        .collection("questions")
        .update<Question>(questionId!, { title: data.title });
      return Promise.all(
        data.answers.map((answer) => {
          if (answer.added) {
            return createAnswer.mutateAsync({ questionId: id, answer });
          }
          if (answer.removed) {
            return removeAnswer.mutateAsync({ questionId: id, answer });
          }
          return editAnswer.mutateAsync({ questionId: id, answer });
        })
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions", questionId] });
      console.log(questionId);
    },
    onError: () => {},
  });

  if (status === "loading") {
    return <CustomSpinner />;
  }
  if (status === "error") {
    return <ErrorPage error={error} />;
  }

  const initialValues: RegisterQuestionValues = {
    title: question.title,
    answers: question.expand["answers(question)"],
  };

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
              editQuestion.mutate(
                { ...data },
                {
                  onSuccess: () => {
                    setMessage("Pregunta actualizada con éxito");
                    successfullDisclosure.onOpen();
                    navigate("/dashboard/questions");
                  },
                  onError: () => {
                    setMessage("Error al actualizar la pregunta");
                    errorDisclosure.onOpen(); //TODO write meaninfull error message
                  },
                }
              );
            }}
          >
            {({ isValid, errors, values }) => (
              <QuestionsForm errors={errors} values={values}>
                <SubmitButton
                  buttonText="Actualizar"
                  isSubmitting={editQuestion.isLoading}
                  isDisabled={!isValid}
                />
              </QuestionsForm>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
};

export default DashboardEditQuestion;
