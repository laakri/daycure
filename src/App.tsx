import { ChakraProvider, extendTheme, Box, Flex } from "@chakra-ui/react";
import { MantineProvider } from "@mantine/core";
import Routing from "./Routing";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

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
            <Flex>
              <Sidebar />
              <Box w={"calc( 100vw - 60px )"} ml={"60px"}>
                <Navbar />
                <Box maxW={"1700px"} p="10px" mx="auto" mt="4">
                  <Routing />
                </Box>
              </Box>
            </Flex>
          </BrowserRouter>
        </QueryClientProvider>
      </MantineProvider>
    </ChakraProvider>
  );
}

export default App;
