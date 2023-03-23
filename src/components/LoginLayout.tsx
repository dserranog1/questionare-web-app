import { Outlet } from "react-router-dom";
import GoBackButton from "./GoBackButton";
import Header from "./Header";

const LoginLayout = () => {
  return (
    <>
      <Header navButton={<GoBackButton to="/" />}></Header>
      <Outlet />
    </>
  );
};

export default LoginLayout;
