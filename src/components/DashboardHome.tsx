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
      <div className="flex w-full flex-col items-center justify-center gap-40">
        <h1 className="text-5xl font-bold text-slate-700">Dashboard</h1>
        <div className="m-auto flex w-fit flex-col gap-20">
          {currentUser.role === "administrador" ? (
            <AdminModules />
          ) : (
            <StudentModules />
          )}
        </div>
      </div>
    );
  }
};

export default DashboardHome;
