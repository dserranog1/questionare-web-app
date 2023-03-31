import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { UserProvider } from "./providers/UserProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fontSizes, spacing, themeColors } from "./theme/config";
import { pb } from "./services/pocketbase";
import AppRouter from "./components/AppRouter";

function App() {
  const theme = extendTheme({
    colors: themeColors,
    space: spacing,
    fontSizes: fontSizes,
  });
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        //never re-fetch unless query is invalited manualy
        staleTime: Infinity,
        cacheTime: Infinity,
      },
    },
  });

  pb.health.check();
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <div className="flex h-full min-h-screen flex-col bg-cool-grey-100 font-sans">
            <AppRouter />
          </div>
        </ChakraProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
