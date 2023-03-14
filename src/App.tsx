import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import DashboardHome from "./components/DashboardHome";
import Home from "./components/Home";
import AuthRouter from "./routers/AuthRouter";

function App() {
  return (
    <ChakraProvider>
      <header className="absolute top-2 right-6 font-pacifico text-5xl">
        Questionare
      </header>
      <div className="flex min-h-screen flex-col justify-center bg-gradient-to-r from-antique-white  to-baby-blue-eyes font-roboto">
        <div className="h-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/*" element={<AuthRouter />} />
            <Route path="dashboard/*" element={<DashboardHome />} />
          </Routes>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
