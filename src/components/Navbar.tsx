import { Link, NavLink } from "react-router-dom";
import { Flex, Text, Box, Img } from "@chakra-ui/react";
import logo from "../assets/logo.png";

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
        <Flex
          gap="10px"
          alignItems="center"
          justifyContent={"center"}
          padding="5px 20px"
        >
          <Img h={"28px"} w={"28px"} src={logo}></Img>
          <Link to="/">
            <Text fontSize="2xl">DailyCure</Text>
          </Link>
        </Flex>
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
      <Flex gap={"20px"}>
        <Flex alignItems="center" rounded="5px" padding="5px 20px">
          <Link to="/">
            <Text fontSize="md">Login</Text>
          </Link>
        </Flex>
        <Flex
          gap="10px"
          alignItems="center"
          rounded="5px"
          p="5px 10px"
          border={"1px solid "}
          borderColor={"purple.700"}
        >
          <Link to="/signup">
            <Text fontSize="md">Sign Up</Text>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
