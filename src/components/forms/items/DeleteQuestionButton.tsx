import {
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DisclosuresContext } from "../../../providers/DisclosuresProvider";
import { pb } from "../../../services/pocketbase";
import { QuestionList } from "../../../types/questions";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const DeleteQuestionButton: FC<Props> = ({ isOpen, onToggle, onClose }) => {
  const { questionId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { successfullDisclosure, errorDisclosure, setMessage } =
    useContext(DisclosuresContext);
  const deleteQuestion = useMutation({
    mutationFn: () => {
      return pb.collection("questions").delete(questionId!);
    },
    onSuccess: () =>
      queryClient.setQueryData(
        ["questions"],
        (old: { items: QuestionList } | undefined) => {
          return {
            ...old,
            items:
              old?.items.filter((question) => question.id !== questionId) ?? [],
          };
        }
      ),
  });
  const handleDelete = () => {
    deleteQuestion.mutate(undefined, {
      onSuccess: () => {
        setMessage("Pregunta eliminada con éxito");
        navigate("/dashboard/questions", { replace: true });
        successfullDisclosure.onOpen();
      },
      onError: () => {
        setMessage("Error al eliminar la pregutna");
        errorDisclosure.onOpen(); //TODO write meaninfull error message
      },
    });
  };
  return (
    <Popover isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button
          isLoading={deleteQuestion.isLoading}
          onClick={onToggle}
          variant="outline"
          borderColor="red-vivid-300"
          _hover={{
            textColor: "red-vivid-600",
            borderColor: "red-vivid-600",
          }}
          textColor="red-vivid-300"
        >
          Eliminar
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody textColor="cool-grey-600">
          ¿Estás seguro que deseas eliminar la pregunta?
        </PopoverBody>
        <PopoverFooter display="flex" justifyContent="flex-end">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              onClose();
              handleDelete();
            }}
          >
            Sí, seguro
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default DeleteQuestionButton;
