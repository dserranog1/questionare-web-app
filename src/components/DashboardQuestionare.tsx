import { Card, CardBody, CardHeader } from "@chakra-ui/react";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useState } from "react";
import { number, object } from "yup";
import { pb } from "../services/pocketbase";
import { ExpandedQuestion } from "../types/questions";
import CustomSpinner from "./ui/CustomSpinner";
import DashboardQuestionareResults from "./DashboardQuestionareResults";
import ErrorPage from "./ErrorPage";
import CustomSelectField from "./forms/items/CustomSelectField";
import SubmitButton from "./forms/items/SubmitButton";

export type RegisteredAnswers = {
  [key: string]: number;
};

const DashboardQuestionare = () => {
  const [didSubmit, setDidSumbit] = useState(false);
  const [registeredAnswers, setRegisteredAnswers] = useState<RegisteredAnswers>(
    {}
  );
  const {
    status,
    error,
    data: questions,
  } = useQuery({
    queryKey: ["questions", "answers"],
    queryFn: () =>
      pb
        .collection("questions")
        .getFullList<ExpandedQuestion>({ expand: "answers(question)" }),
    onSuccess: (data) => console.log(data),
  });
  if (status === "error") {
    return <ErrorPage error={error} />;
  }
  if (status === "loading") {
    return <CustomSpinner />;
  } else {
    const handleSubmit = (registeredAnswers: RegisteredAnswers) => {
      setRegisteredAnswers(registeredAnswers);
      setDidSumbit(true);
    };
    const shapeWithDynamicFields = questions.reduce((obj, currentQuestion) => {
      // create a key: value schema with the key as the question id
      return {
        ...obj,
        [currentQuestion.id]: number().required("Pregunta requerida"),
      };
    }, {});
    const initialValues: RegisteredAnswers = {};
    return (
      <div className="my-6 flex flex-1 items-center justify-center">
        {didSubmit ? (
          <DashboardQuestionareResults
            setDidSumbit={setDidSumbit}
            registeredAnswers={registeredAnswers}
            questions={questions}
          />
        ) : (
          <div>
            <Card
              variant="elevated"
              size="lg"
              border="2px"
              borderColor="cool-grey-100"
              bgColor="cool-grey-050"
            >
              <RocketLaunchIcon className="absolute top-0 left-0 -mt-6 w-8 fill-light-blue-vivid-300" />
              <CardHeader
                textColor="cool-grey-800"
                fontWeight="bold"
                fontSize="6"
                pb="0"
              >
                Cuestionario
              </CardHeader>
              <CardBody>
                <Formik
                  initialValues={initialValues}
                  validationSchema={object().shape(shapeWithDynamicFields)}
                  onSubmit={handleSubmit}
                >
                  {({ isValid, values }) => (
                    <Form>
                      <div className="flex flex-col gap-7">
                        {questions.map((question) => {
                          return (
                            <div key={question.id}>
                              {question.title}
                              <CustomSelectField
                                options={question.expand[
                                  "answers(question)"
                                ].map((answer, idx) => {
                                  return {
                                    value: idx,
                                    label: answer.description,
                                  };
                                })}
                                name={`${question.id}`}
                                placeholder="Seleccione una"
                                isRequired={false}
                              />
                            </div>
                          );
                        })}
                        <SubmitButton
                          buttonText="Enviar"
                          isDisabled={
                            !isValid ||
                            !(Object.keys(values).length === questions.length)
                          }
                          isSubmitting={false}
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    );
  }
};

export default DashboardQuestionare;
