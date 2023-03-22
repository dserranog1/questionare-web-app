import { Spinner } from "@chakra-ui/react";

const CustomSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Spinner size="xl" thickness="4px" color="light-blue-vivid-400" />
      <p className="text-cool-grey-400">Cargando</p>
    </div>
  );
};

export default CustomSpinner;
