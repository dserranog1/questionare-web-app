import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import {
  CheckBadgeIcon,
  IdentificationIcon,
  InboxIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { FC } from "react";
import { Options } from "../types/forms";
import { User } from "../types/user";

interface Props {
  student: User | undefined;
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

const StudentInfoModal: FC<Props> = ({ isOpen, onClose, student }) => {
  const documentName =
    documentTypes.find((doc) => +doc.value === student?.typeDocument)?.label ||
    "";
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent m="0">
        <ModalHeader>
          <div className="flex flex-row gap-3">
            <UserCircleIcon className="w-6 fill-light-blue-vivid-700" />{" "}
            Información del estudiante
          </div>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          justifyContent="flex-start"
          display="flex"
          px="7"
          textColor="cool-grey-600"
        >
          {student ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-6">
                <CheckBadgeIcon className="w-5 fill-cool-grey-900" />
                {student.firstName +
                  " " +
                  student.secondName +
                  " " +
                  student.surname +
                  " " +
                  student.secondSurName}
              </div>
              <div className="flex flex-row gap-6">
                <InboxIcon className="w-5 fill-cool-grey-900" />
                {student.email}
              </div>
              <div className="flex flex-row gap-6">
                <PhoneIcon className="w-5 fill-cool-grey-900" />
                {student.phone}
              </div>
              <div className="flex flex-row gap-6">
                <IdentificationIcon className="w-5 fill-cool-grey-900" />
                <div className="flex flex-col justify-center">
                  <p>{student.documentNumber}</p>
                  <p className="text-1">{documentName}</p>
                </div>
              </div>
            </div>
          ) : (
            <p>Error al obtener la información del estudiante</p>
          )}
        </ModalBody>
        <ModalFooter>
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StudentInfoModal;
