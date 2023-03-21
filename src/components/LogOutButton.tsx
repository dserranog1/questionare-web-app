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
    <div className="absolute top-2 left-3">
      <Button
        size="sm"
        variant="ghost"
        boxShadow="0 3px 6px rgba(0,0,0, 0.15)"
        textColor="cool-grey-200"
        border="1px"
        _hover={{
          textColor: "cool-grey-050",
        }}
        onClick={handleOnClick}
      >
        Cerrar Sesion
      </Button>
    </div>
  );
};

export default LogOutButton;
