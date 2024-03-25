import React from "react";
import { Box, Text, Flex, Img } from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import {
  IoFitnessOutline,
  IoSettingsOutline,
  IoWalletOutline,
} from "react-icons/io5";
import { MdOutlineAddTask } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { BsPatchQuestion } from "react-icons/bs";
import logo from "../assets/logo.png";

const Sidebar: React.FC = () => {
  return (
    <Flex
      flexDirection="column"
     
      alignItems="center"
      bg="var(--lvl3-darkcolor)"
      p={"20px 10px "}
      w={"70px"}
      h={"100vh"}
      position={"fixed"}
      justifyContent={"space-between"}
    >
      <Flex flexDirection={"column"} gap="50px">
        <Box p=" 10px">
          <Link to="/">
            <Img h={"28px"} w={"28px"} src={logo}></Img>
          </Link>
        </Box>
        <Flex flexDirection={"column"} gap="20px">
          <NavLink to="/dashboard">
            <Text fontSize="xl" p=" 10px" color="white">
              <RxDashboard />
            </Text>
          </NavLink>
          <NavLink to="/schedule">
            <Text fontSize="xl" p=" 10px" color="white">
              <MdOutlineAddTask />
            </Text>
          </NavLink>
          <NavLink to="/wallet">
            <Text fontSize="xl" p=" 10px" color="white">
              <IoWalletOutline />
            </Text>
          </NavLink>
          <NavLink to="/fitness">
            <Text fontSize="xl" p=" 10px" color="white">
              <IoFitnessOutline />
            </Text>
          </NavLink>
        </Flex>
      </Flex>
      <Flex flexDirection={"column"} gap="20px">
        <Box>
          <Text fontSize="xl" p="5px 10px" color="white">
            <IoSettingsOutline />
          </Text>
        </Box>
        <Box>
          <Text fontSize="xl" p="5px 10px" color="white">
            <BsPatchQuestion />
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
