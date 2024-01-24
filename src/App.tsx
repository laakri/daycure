import { BrowserRouter } from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Routing from "./Routing";
import Navbar from "./components/Navbar";
import "./App.css";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Navbar />
        <Box maxW="1400px" p="10px" mx="auto" mt="4">
          <Routing />
        </Box>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
