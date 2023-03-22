import { Route, Routes, useLocation } from "react-router-dom";
import NoMatch from "../components/NoMatch";
import DashboardHome from "../components/DashboardHome";
import LogOutButton from "../components/LogOutButton";
import DashboardQuestionare from "../components/DashboardQuestionare";
import DashboardQuestions from "../components/DashboardQuestions";
import DashboardStudents from "../components/DashboardStudents";
import GoBackButton from "../components/GoBackButton";
import Auth from "../components/Auth";
import Header from "../components/Header";
import DashboardAddStudent from "../components/DashboardAddStudent";

const DashboardRouter = () => {
  const location = useLocation();
  return (
    <>
      <Header
        navButton={
          location.pathname.includes("home") ? (
            <LogOutButton />
          ) : (
            <GoBackButton to={"/dashboard/home"} />
          )
        }
      ></Header>
      {}
      <Routes>
        <Route path="home" element={<DashboardHome />} />
        <Route element={<Auth allowedRole="estudiante" />}>
          <Route path="questionare" element={<DashboardQuestionare />} />
        </Route>
        <Route element={<Auth allowedRole="administrador" />}>
          <Route path="questions">
            <Route index element={<DashboardQuestions />} />
          </Route>
          <Route path="students">
            <Route index element={<DashboardStudents />} />
            <Route path="add" element={<DashboardAddStudent />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={
            <NoMatch
              fallbackRoute="/dashboard/home"
              fallbackPageName="Dashboard"
            />
          }
        />
      </Routes>
    </>
  );
};
export default DashboardRouter;
