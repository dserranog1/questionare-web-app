import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { pb } from "../../services/pocketbase";
import { ExpandedQuestion } from "../../types/questions";
import CustomSpinner from "./CustomSpinner";

interface Props {
  questionId: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  isControlled: boolean;
}

const QuestionInfoModal: FC<Props> = ({ isOpen, onClose, questionId }) => {
  const navigate = useNavigate();
  const { status, data: question } = useQuery({
    queryKey: ["questions", questionId],
    queryFn: () =>
      pb
        .collection("questions")
        .getFirstListItem<ExpandedQuestion>(`id="${questionId}"`, {
          expand: "answers(question)",
        }),
  });

  const getContent = () => {
    if (status === "error") {
      return <p>Error al obtener la información del estudiante</p>; //TODO more meaningful message
    }
    if (status === "loading") {
      return <CustomSpinner />;
    }
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-row gap-4 text-5 font-bold text-cool-grey-900">
          <QuestionMarkCircleIcon className="w-5 fill-cool-grey-800" />
          {question.title}
        </div>
        <div className="flex flex-col gap-6">
          {question.expand["answers(question)"].map((answer) => {
            return (
              <div key={answer.id} className="ml-5 flex flex-row gap-5">
                {answer.correct ? (
                  <CheckCircleIcon className="w-5 fill-teal-500" />
                ) : (
                  <XCircleIcon className="w-5 fill-red-500" />
                )}
                {answer.description}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  //TODO add posibility to go edit from the modal (add edit button)
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent m="0">
        <ModalHeader>
          <div className="flex flex-row gap-3 text-cool-grey-400">
            <InformationCircleIcon className="w-6 fill-light-blue-vivid-700" />{" "}
            Información de la pregunta
          </div>
        </ModalHeader>
        <ModalBody
          justifyContent="flex-start"
          display="flex"
          px="7"
          textColor="cool-grey-600"
        >
          {getContent()}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            variant="solid"
            bgColor="light-blue-vivid-500"
            textColor="cool-grey-050"
            _hover={{ bgColor: "light-blue-vivid-800" }}
            mr={3}
            onClick={() => {
              navigate(-1);
              onClose;
            }}
          >
            Volver
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default QuestionInfoModal;
