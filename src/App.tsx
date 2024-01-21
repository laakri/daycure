import { BrowserRouter } from "react-router-dom";
import Routing from "./Routing";
import Navbar from "./components/Navbar";
import "./App.css";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Box maxW="1200px" mx="auto" mt="4">
        <Routing />
      </Box>
    </BrowserRouter>
  );
}

export default App;
