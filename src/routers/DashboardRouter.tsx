import { Route, Routes, useLocation } from "react-router-dom";
import NoMatch from "../components/NoMatch";
import DashboardHome from "../components/DashboardHome";
import LogOutButton from "../components/LogOutButton";
import DashboardQuestionare from "../components/DashboardQuestionare";
import DashboardQuestions from "../components/DashboardQuestions";
import DashboardStudents from "../components/DashboardStudents";
import GoBackButton from "../components/GoBackButton";
import Auth from "../components/Auth";

const DashboardRouter = () => {
  const location = useLocation();
  return (
    <div>
      {location.pathname.includes("home") ? <LogOutButton /> : <GoBackButton />}
      <Routes>
        <Route path="home" element={<DashboardHome />} />
        <Route element={<Auth allowedRole="estudiante" />}>
          <Route path="questionare" element={<DashboardQuestionare />} />
        </Route>
        <Route element={<Auth allowedRole="administrador" />}>
          <Route path="questions" element={<DashboardQuestions />} />
          <Route path="students" element={<DashboardStudents />} />
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
    </div>
  );
};

export default DashboardRouter;
