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
  CheckBadgeIcon,
  IdentificationIcon,
  InboxIcon,
  InformationCircleIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Link } from "react-router-dom";
import { pb } from "../../services/pocketbase";
import { Options } from "../../types/forms";
import { User } from "../../types/user";
import CustomSpinner from "./CustomSpinner";

interface Props {
  studentId: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  isControlled: boolean;
}

export const documentTypes: Options = [
  { value: 1, label: "Tarjeta de identidad" },
  { value: 2, label: "Cédula de ciudadanía" },
  { value: 3, label: "Cédula de extranjería" },
];

const StudentInfoModal: FC<Props> = ({ isOpen, onClose, studentId }) => {
  const { status, data: student } = useQuery({
    queryKey: ["students", studentId],
    queryFn: () => pb.collection("users").getOne<User>(studentId),
  });

  const getContent = () => {
    if (status === "error") {
      return <p>Error al obtener la información del estudiante</p>; //TODO more meaningful message
    }
    if (status === "loading") {
      return <CustomSpinner />;
    }
    const documentName = documentTypes.find(
      (doc) => +doc.value === student.typeDocument
    )?.label;
    return (
      <div className="text-cool-grey-704 flex flex-col gap-4 text-3">
        <div className="flex flex-row gap-6">
          <UserCircleIcon className="w-5 fill-cool-grey-800" />
          {student.firstName +
            " " +
            student.secondName +
            " " +
            student.surname +
            " " +
            student.secondSurName}
        </div>
        <div className="flex flex-row gap-6">
          <InboxIcon className="w-5 fill-cool-grey-800" />
          {student.email}
        </div>
        <div className="flex flex-row gap-6">
          <PhoneIcon className="w-5 fill-cool-grey-800" />
          {student.phone}
        </div>
        <div className="flex flex-row gap-6">
          <IdentificationIcon className="w-5 fill-cool-grey-800" />
          <div className="flex flex-col justify-center">
            <p>{student.documentNumber}</p>
            <p className="text-1">{documentName}</p>
          </div>
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
            Información del estudiante
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
          <Link to={".."}>
            <Button
              colorScheme="blue"
              variant="solid"
              bgColor="light-blue-vivid-500"
              textColor="cool-grey-050"
              _hover={{ bgColor: "light-blue-vivid-800" }}
              mr={3}
              onClick={onClose}
            >
              Cerrar
            </Button>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default StudentInfoModal;
