import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";

const LogOutButton = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);
  const handleOnClick = () => {
    setCurrentUser(null);
    navigate("/");
  };
  return (
    <div className="absolute top-2 left-3 text-lg text-slate-600 hover:text-slate-800">
      <Button
        colorScheme="gray"
        className="flex flex-row items-center justify-center gap-3"
        onClick={handleOnClick}
      >
        Cerrar Sesion
      </Button>
    </div>
  );
};

export default LogOutButton;
