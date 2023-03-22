import { useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import AdminModules from "./AdminModules";
import StudentModules from "./StudentModules";

const DashboardHome = () => {
  const { currentUser } = useContext(UserContext);
  const toast = useToast();
  if (!currentUser) {
    toast({
      description: "Inicia sesión para continuar",
      status: "warning",
      duration: 2000,
      position: "top-right",
      isClosable: true,
    });
    return <Navigate to="/login" />;
  } else {
    return (
      <div className="flex h-15 flex-col gap-10 self-start">
        <div className="ml-3 text-8 font-bold text-cool-grey-800">
          Hola de nuevo,{" "}
          <span className="text-light-blue-vivid-600">
            {currentUser.name.substring(0, currentUser.name.indexOf(" "))}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center gap-8">
          <h2 className="text-6 text-cool-grey-500">
            Selecciona un modulo para continuar
          </h2>
          <div className="gap-20 m-auto flex w-fit flex-col">
            {currentUser.role === "administrador" ? (
              <AdminModules />
            ) : (
              <StudentModules />
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default DashboardHome;
