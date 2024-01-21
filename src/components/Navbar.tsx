import { Link } from "react-router-dom";
import { Flex, Text, Box } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex align="center" justify="space-between" display="flex" width="100vw">
      <Flex>
        <Box
          display="flex"
          gap="10px"
          alignItems="center"
          rounded="5px"
          padding="5px 20px"
        >
          <Link to="/">
            <Text fontSize="xl">DailyCure</Text>
          </Link>
        </Box>
      </Flex>
      <Flex
        as="nav"
        align="center"
        justify="space-around"
        wrap="wrap"
        padding="5px 20px"
        display="flex"
        gap="20px"
        background="#39007277"
        rounded="10px"
        maxW="500px"
        margin="auto"
        marginTop="10px"
      >
        <Box display="flex" gap="10px" alignItems="center">
          <Link to="/">
            <Text fontSize="lg">Dashboard</Text>
          </Link>
        </Box>
        <Box display="flex" gap="10px" alignItems="center">
          <Link to="/schedule">
            <Text fontSize="lg">Schedule</Text>
          </Link>
        </Box>
        <Box display="flex" gap="10px" alignItems="center">
          <Link to="/wallet">
            <Text fontSize="lg">Wallet</Text>
          </Link>
        </Box>
        <Box display="flex" gap="10px" alignItems="center">
          <Link to="/fitness">
            <Text fontSize="lg">Fitness</Text>
          </Link>
        </Box>
      </Flex>
      <Flex>
        <Box
          display="flex"
          gap="10px"
          alignItems="center"
          rounded="5px"
          padding="5px 20px"
        >
          <Link to="/">
            <Text fontSize="lg">Login</Text>
          </Link>
        </Box>
        <Box
          display="flex"
          gap="10px"
          alignItems="center"
          rounded="5px"
          padding="5px 20px"
        >
          <Link to="/">
            <Text fontSize="lg">Sign Up</Text>
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
