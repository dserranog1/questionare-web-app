import { Button } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        navigate(-1);
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
