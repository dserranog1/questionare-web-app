import { useLocation, Navigate, Outlet } from "react-router-dom";
import { FC, useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { useToast } from "@chakra-ui/react";

interface Props {
  allowedRole: string;
}

const Auth: FC<Props> = ({ allowedRole }) => {
  const { currentUser } = useContext(UserContext);
  const toast = useToast();
  const location = useLocation();

  if (currentUser && currentUser.role === allowedRole) {
    return <Outlet />;
  } else if (!currentUser) {
    toast({
      description: "Inicia sesión para continuar",
      status: "warning",
      duration: 2000,
      position: "top-right",
      isClosable: true,
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    toast({
      description: "No tienes acceso a este recurso",
      status: "error",
      duration: 2000,
      position: "top-right",
      isClosable: true,
    });
    return <Navigate to="/dashboard/home" state={{ from: location }} replace />;
  }
};

export default Auth;
