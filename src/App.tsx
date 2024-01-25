import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import Routing from "./Routing";
import Navbar from "./components/Navbar";
import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { ChakraProvider, extendTheme, Box } from "@chakra-ui/react";

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
  return (
    <ChakraProvider theme={theme}>
      <MantineProvider defaultColorScheme="dark">
        <BrowserRouter>
          <Navbar />
          <Box maxW="1400px" p="10px" mx="auto" mt="4">
            <Routing />
          </Box>
        </BrowserRouter>
      </MantineProvider>
    </ChakraProvider>
  );
}

export default App;
