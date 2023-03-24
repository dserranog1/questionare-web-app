import { Outlet, useLocation } from "react-router-dom";
import GoBackButton from "./GoBackButton";
import Header from "./Header";
import LogOutButton from "./LogOutButton";

const DashboardLayout = () => {
  const location = useLocation();
  return (
    <>
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
