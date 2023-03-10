import { Button } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute top-2 left-3 text-lg text-slate-600 hover:text-slate-800">
      <Button
        leftIcon={<ChevronLeftIcon className="w-4" />}
        colorScheme="gray"
        className="flex flex-row items-center justify-center gap-3"
        onClick={() => {
          navigate("/");
        }}
      >
        Atras
      </Button>
    </div>
  );
};

export default GoBackButton;
