import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { UserProvider } from "./providers/UserProvider";
import AuthRouter from "./routers/AuthRouter";
import DashboardRouter from "./routers/DashboardRouter";

function App() {
  return (
    <UserProvider>
      <ChakraProvider>
        <header className="absolute top-2 right-6 font-pacifico text-5xl">
          Questionare
        </header>
        <div className="flex min-h-screen flex-col justify-center bg-gradient-to-r from-antique-white  to-baby-blue-eyes font-roboto">
          <div className="h-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth/*" element={<AuthRouter />} />
              <Route path="/dashboard/*" element={<DashboardRouter />} />
            </Routes>
          </div>
        </div>
      </ChakraProvider>
    </UserProvider>
  );
}

export default App;
