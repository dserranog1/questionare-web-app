import { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DisclosuresContext } from "../providers/DisclosuresProvider";
import CustomModal from "./CustomModal";
import GoBackButton from "./GoBackButton";
import Header from "./Header";
import LogOutButton from "./LogOutButton";

const DashboardLayout = () => {
  const location = useLocation();
  const { successfullDisclosure, errorDisclosure } =
    useContext(DisclosuresContext);
  return (
    <>
      <CustomModal
        info={"Estudiante creado con éxito"}
        isSuccessModal={true}
        {...successfullDisclosure}
      />
      <CustomModal
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
