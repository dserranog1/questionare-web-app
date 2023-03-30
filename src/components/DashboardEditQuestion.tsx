import { Card, CardBody, CardHeader } from "@chakra-ui/react";
import { Formik } from "formik";
import { UpdateQuestionValues } from "../types/forms";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { pb } from "../services/pocketbase";
import { useNavigate, useParams } from "react-router-dom";
import { RegisterQuestionSchema } from "../schemas";
import { useContext, useEffect, useState } from "react";
import { DisclosuresContext } from "../providers/DisclosuresProvider";
import SubmitButton from "./forms/items/SubmitButton";
import QuestionsAddForm from "./forms/QuestionsAddForm";
import { Answer, ExpandedQuestion, Question } from "../types/questions";
import CustomSpinner from "./CustomSpinner";

const DashboardEditQuestion = () => {
  const { questionId } = useParams();
  const [correctOption, setCorrectOption] = useState("0");
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

  // TODO handle errors when either question or answer creation fails
  // the idea is that if the question creation fails, stay on add, but if
  // the question is created but the answers fail, redirect to edit

  const editQuestion = useMutation({
    mutationFn: async (data: UpdateQuestionValues) => {
      const { id } = await pb
        .collection("questions")
        .update<Question>(questionId!, { title: data.title });
      return Promise.all(
        data.answers.map((answer) =>
          editAnswer.mutateAsync({ questionId: id, answer })
        )
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["questions", questionId] }),
    onError: () => {},
  });

  useEffect(() => {
    question?.expand["answers(question)"].forEach((answer, idx) => {
      if (answer.correct === true) {
        setCorrectOption(`${idx}`);
      }
    });
  }, [question]);
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

  const initialValues: UpdateQuestionValues = {
    title: question.title,
    answers: question.expand["answers(question)"],
  };
  console.log("correct answer is", correctOption);

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
            onSubmit={(data: UpdateQuestionValues) => {
              data.answers.forEach((answer, idx) => {
                if (answer.correct === true && idx !== +correctOption)
                  answer.correct = false;
              });
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
                  buttonText="Actualizar"
                  //   isSubmitting={createUser.isLoading}
                  isSubmitting={false}
                  isDisabled={!isValid}
                />
              </QuestionsAddForm>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
};

export default DashboardEditQuestion;
