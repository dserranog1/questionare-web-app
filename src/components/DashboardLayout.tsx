import { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { DisclosuresContext } from "../providers/DisclosuresProvider";
import SuccessErrorModal from "./SuccessErrorModal";
import Header from "./Header";
import LogOutButton from "./LogOutButton";
import { Button } from "@chakra-ui/react";
import GoBackButton from "./GoBackButton";
import { UserContext } from "../providers/UserProvider";

const DashboardLayout = () => {
  const location = useLocation();
  const { successfullDisclosure, errorDisclosure, message } =
    useContext(DisclosuresContext);
  const { currentUser } = useContext(UserContext);
  return (
    <>
      <SuccessErrorModal
        info={message}
        isSuccessModal={true}
        {...successfullDisclosure}
      />
      <SuccessErrorModal
        info={message}
        isSuccessModal={false}
        {...errorDisclosure}
      />
      <Header
        navButton={
          location.pathname === "/dashboard" ? (
            <LogOutButton />
          ) : (
            <GoBackButton />
          )
        }
      >
        <div className="mx-auto flex flex-row gap-10">
          <Link to="">
            <Button
              variant="link"
              _hover={{ textColor: "cool-grey-050" }}
              textColor="cool-grey-200"
            >
              Dashboard
            </Button>{" "}
          </Link>
          {currentUser?.role === "administrador" ? (
            <>
              <Link to="students">
                <Button
                  variant="link"
                  _hover={{ textColor: "cool-grey-050" }}
                  textColor="cool-grey-200"
                >
                  Estudiantes
                </Button>{" "}
              </Link>
              <Link to="questions">
                <Button
                  variant="link"
                  _hover={{ textColor: "cool-grey-050" }}
                  textColor="cool-grey-200"
                >
                  Preguntas
                </Button>{" "}
              </Link>
            </>
          ) : (
            <Link to="questionare">
              <Button
                variant="link"
                _hover={{ textColor: "cool-grey-050" }}
                textColor="cool-grey-200"
              >
                Formulario
              </Button>{" "}
            </Link>
          )}
        </div>
      </Header>
      <Outlet />
    </>
  );
};

export default DashboardLayout;
