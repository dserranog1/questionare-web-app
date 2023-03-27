import { Button } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  to?: string;
}

const GoBackButton: FC<Props> = ({ to }) => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        navigate(to ? to : ".");
      }}
      size="sm"
      leftIcon={<ChevronLeftIcon className="w-4" />}
      _hover={{
        textColor: "cool-grey-050",
      }}
      variant="outline"
      boxShadow="0 3px 6px rgba(0,0,0, 0.15)"
      border="1px"
      textColor="cool-grey-200"
    >
      Atras
    </Button>
  );
};

export default GoBackButton;
