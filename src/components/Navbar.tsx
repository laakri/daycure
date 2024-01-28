import { Link, NavLink } from "react-router-dom";
import { Flex, Text, Box } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex
      align="center"
      justify="space-between"
      display="flex"
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
            <Text fontSize="2xl">DailyCure</Text>
          </Link>
        </Box>
      </Flex>
      <Flex
        as="nav"
        align="center"
        justify="space-around"
        wrap="wrap"
        padding="7px 10px"
        display="flex"
        gap="20px"
        background="var(--lvl1-darkcolor)"
        rounded="10px"
        maxW="500px"
        margin="auto"
      >
        <Box display="flex" gap="10px" alignItems="center">
          <NavLink to="/">
            <Text fontSize="md">Dashboard</Text>
          </NavLink>
        </Box>
        <Box display="flex" gap="10px" alignItems="center">
          <NavLink to="/schedule">
            <Text fontSize="md">Schedule</Text>
          </NavLink>
        </Box>
        <Box display="flex" gap="10px" alignItems="center">
          <NavLink to="/wallet">
            <Text fontSize="md">Wallet</Text>
          </NavLink>
        </Box>
        <Box display="flex" gap="10px" alignItems="center">
          <NavLink to="/fitness">
            <Text fontSize="md">Fitness</Text>
          </NavLink>
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
            <Text fontSize="md">Login</Text>
          </Link>
        </Box>
        <Box
          display="flex"
          gap="10px"
          alignItems="center"
          rounded="5px"
          padding="5px 10px"
          background="var(--lvl1-darkcolor)"
          border={"var(--bordercolor) solid 1px"}
        >
          <Link to="/">
            <Text fontSize="md">Sign Up</Text>
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
