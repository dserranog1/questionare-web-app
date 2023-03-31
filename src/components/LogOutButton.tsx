import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import { pb } from "../services/pocketbase";

const LogOutButton = () => {
  const { setCurrentUser } = useContext(UserContext);
  const handleOnClick = () => {
    setCurrentUser(null);
    pb.authStore.clear();
  };
  return (
    <Link to={"/"}>
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
    </Link>
  );
};

export default LogOutButton;
