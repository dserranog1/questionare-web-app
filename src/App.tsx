import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { UserProvider } from "./providers/UserProvider";
import LoginRouter from "./routers/LoginRouter";
import DashboardRouter from "./routers/DashboardRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        //never re-fetch unless query is invalited manualy
        staleTime: Infinity,
        cacheTime: Infinity,
      },
    },
  });

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <header className="absolute top-2 right-6 font-pacifico text-5xl">
            Questionare
          </header>
          <div className="flex min-h-screen flex-col justify-center bg-gradient-to-r from-antique-white  to-baby-blue-eyes font-roboto">
            <div className="h-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login/*" element={<LoginRouter />} />
                <Route path="/dashboard/*" element={<DashboardRouter />} />
              </Routes>
            </div>
          </div>
        </ChakraProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
