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
import { UserList } from "../../../types/user";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const DeleteStudentButton: FC<Props> = ({ isOpen, onToggle, onClose }) => {
  const { studentId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { successfullDisclosure, errorDisclosure, setMessage } =
    useContext(DisclosuresContext);
  const deleteUser = useMutation({
    mutationFn: () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return pb.collection("users").delete(studentId!);
    },
    onSuccess: () =>
      queryClient.setQueryData(
        ["students"],
        (old: { items: UserList } | undefined) => {
          return {
            ...old,
            items:
              old?.items.filter((student) => student.id !== studentId) ?? [],
          };
        }
      ),
  });
  const handleDelete = () => {
    deleteUser.mutate(undefined, {
      onSuccess: () => {
        setMessage("Estudiante eliminado con éxito");
        navigate("/dashboard/students", { replace: true });
        successfullDisclosure.onOpen();
      },
      onError: () => {
        setMessage("Error al eliminar el estudiante");
        errorDisclosure.onOpen(); //TODO write meaninfull error message
      },
    });
  };
  return (
    <Popover isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button
          isLoading={deleteUser.isLoading}
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
          ¿Estás seguro que deseas eliminar el estudiante?
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

export default DeleteStudentButton;
