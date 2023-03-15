import { Button } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  to: string;
}

const GoBackButton: FC<Props> = ({ to }) => {
  const navigate = useNavigate();
  return (
    <div className="absolute top-2 left-3 text-lg text-slate-600 hover:text-slate-800">
      <Button
        leftIcon={<ChevronLeftIcon className="w-4" />}
        colorScheme="gray"
        className="flex flex-row items-center justify-center gap-3"
        onClick={() => {
          navigate(to);
        }}
      >
        Atras
      </Button>
    </div>
  );
};

export default GoBackButton;
