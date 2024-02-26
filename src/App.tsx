import { ChakraProvider, extendTheme, Box } from "@chakra-ui/react";

import { MantineProvider } from "@mantine/core";
import Routing from "./Routing";
import Navbar from "./components/Navbar";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { BrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";
/*import { ReactQueryDevtools } from "@tanstack/react-query-devtools";*/

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
  styles: {
    global: {},
  },
  colorScheme: "dark",
});

function App() {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider theme={theme}>
      <MantineProvider defaultColorScheme="dark">
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Navbar />
            <Box maxW="1400px" p="10px" mx="auto" mt="4">
              <Routing />
            </Box>
            {/*<ReactQueryDevtools initialIsOpen={false} client={queryClient} /> */}
          </BrowserRouter>
        </QueryClientProvider>
      </MantineProvider>
    </ChakraProvider>
  );
}

export default App;
