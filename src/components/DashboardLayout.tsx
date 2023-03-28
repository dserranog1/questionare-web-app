import { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DisclosuresContext } from "../providers/DisclosuresProvider";
import SuccessErrorModal from "./SuccessErrorModal";
import GoBackButton from "./GoBackButton";
import Header from "./Header";
import LogOutButton from "./LogOutButton";

const DashboardLayout = () => {
  const location = useLocation();
  const { successfullDisclosure, errorDisclosure } =
    useContext(DisclosuresContext);
  return (
    <>
      <SuccessErrorModal
        info={"Estudiante creado con éxito"}
        isSuccessModal={true}
        {...successfullDisclosure}
      />
      <SuccessErrorModal
        info={"Error al crear el estudiante"}
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
      ></Header>
      <Outlet />
    </>
  );
};

export default DashboardLayout;
