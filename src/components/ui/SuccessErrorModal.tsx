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
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { FC } from "react";

interface Props {
  info: string;
  isSuccessModal: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  isControlled: boolean;
}

const SuccessErrorModal: FC<Props> = ({
  isOpen,
  onClose,
  info,
  isSuccessModal,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent m="0">
        <ModalHeader>
          {isSuccessModal ? (
            <div className="flex flex-row gap-3">
              <CheckCircleIcon className="w-6 fill-teal-500" />
              {"Exito"}
            </div>
          ) : (
            <div className="flex flex-row gap-3">
              <XCircleIcon className="w-6 fill-red-vivid-500" />
              {"Error"}
            </div>
          )}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody justifyContent="flex-start" display="flex" px="7">
          <div>{info}</div>
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

export default SuccessErrorModal;
