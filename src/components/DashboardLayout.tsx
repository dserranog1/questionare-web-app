import { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DisclosuresContext } from "../providers/DisclosuresProvider";
import SuccessErrorModal from "./SuccessErrorModal";
import GoBackButton from "./GoBackButton";
import Header from "./Header";
import LogOutButton from "./LogOutButton";

const DashboardLayout = () => {
  const location = useLocation();
  const { successfullDisclosure, errorDisclosure, message } =
    useContext(DisclosuresContext);
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
      ></Header>
      <Outlet />
    </>
  );
};

export default DashboardLayout;
