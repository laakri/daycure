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
          minW={"150px"}
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
        padding="5px 10px"
        display="flex"
        gap="15px"
        bg="var(--lvl3-darkcolor)"
        rounded="10px"
        maxW="500px"
        margin="auto"
        mt={"10px"}
      >
        <Box display="flex" gap="10px" alignItems="center">
          <NavLink to="/dashboard">
            <Text fontSize="md" p="5px 10px">
              Dashboard
            </Text>
          </NavLink>
        </Box>
        <Box display="flex" gap="10px" alignItems="center ">
          <NavLink to="/schedule">
            <Text fontSize="md" p="5px 10px">
              Schedule
            </Text>
          </NavLink>
        </Box>
        <Box display="flex" gap="10px" alignItems="cent e r">
          <NavLink to="/wallet">
            <Text fontSize="md" p="5px 10px">
              Wallet
            </Text>
          </NavLink>
        </Box>
        <Box display="flex" gap="10px" alignItems="cente r ">
          <NavLink to="/fitness">
            <Text fontSize="md" p="5px 10px">
              Fitness
            </Text>
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
          p="5px 10px"
          border={"var(--maincolor) solid 1px"}
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
