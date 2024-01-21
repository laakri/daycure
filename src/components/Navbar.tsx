import { Link } from "react-router-dom";
import { Flex, Text, Box } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex
      align="center"
      justify="space-between"
      display="flex"
      width="100vw"
      h="60px"
      px="10px"
    >
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
        padding="7px 20px"
        display="flex"
        gap="20px"
        background="var(--lvl1-darkcolor)"
        rounded="10px"
        maxW="500px"
        margin="auto"
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
          background="var(--lvl1-darkcolor)"
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
