import { Button } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { ExpandedQuestion } from "../types/questions";
import { RegisteredAnswers } from "./DashboardQuestionare";

interface Props {
  questions: ExpandedQuestion[];
  registeredAnswers: RegisteredAnswers;
  setDidSumbit: React.Dispatch<React.SetStateAction<boolean>>;
}

const checkIfRight = (
  question: ExpandedQuestion,
  selectedAnswer: number
): boolean => {
  let isCorrect = false;
  question.expand["answers(question)"].forEach((answer, idx) => {
    if (answer.correct === true && selectedAnswer === idx) {
      isCorrect = true;
      return;
    }
  });
  return isCorrect;
};

const DashboardQuestionareResults: FC<Props> = ({
  questions,
  registeredAnswers,
  setDidSumbit,
}) => {
  const numberOfQuestions = questions.length;
  let numberOfCorrectAnswers = 0;
  let rightPercentage = 0;

  questions.forEach((question) => {
    if (checkIfRight(question, registeredAnswers[question.id])) {
      numberOfCorrectAnswers += 1;
    }
  });
  rightPercentage = (numberOfCorrectAnswers / numberOfQuestions) * 100;

  return (
    <div className="flex flex-col items-center gap-8 text-7 text-cool-grey-500">
      Tuviste un{" "}
      <p className="text-9 font-bold text-light-blue-vivid-700">
        {Math.round(rightPercentage)}%
      </p>
      de respuestas correctas
      <div className="flex flex-row items-center justify-center gap-4">
        <Button
          mt="1.5"
          onClick={() => {
            setDidSumbit(false);
          }}
          variant="outline"
          borderColor="light-blue-vivid-700"
          bgColor="cool-grey-050"
          textColor="light-blue-vivid-700"
        >
          Reintentar
        </Button>
        <Link to={"/dashboard"}>
          <Button
            variant="outline"
            borderColor="light-blue-vivid-700"
            bgColor="cool-grey-050"
            textColor="light-blue-vivid-700"
          >
            Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardQuestionareResults;
