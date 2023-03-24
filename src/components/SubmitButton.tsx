import { Button } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  isDisabled: boolean;
  isSubmitting: boolean;
  buttonText: string;
}

const SubmitButton: FC<Props> = ({ isDisabled, isSubmitting, buttonText }) => {
  return (
    <Button
      isDisabled={isDisabled}
      type="submit"
      bgColor="light-blue-vivid-500"
      textColor="cool-grey-050"
      _hover={{ bgColor: "light-blue-vivid-800" }}
      variant="solid"
      isLoading={isSubmitting}
    >
      {buttonText}
    </Button>
  );
};

export default SubmitButton;
