import { Link, NavLink } from "react-router-dom";
import {
  Flex,
  Text,
  Box,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Divider,
} from "@chakra-ui/react";
import logo from "../assets/logo.png";
import { FaMoon, FaUserAstronaut } from "react-icons/fa6";
import { useState } from "react";
import { IoIosSettings, IoMdLogOut } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { logout } from "../states/auth";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const UserName = localStorage.getItem("userName");
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    logout();
  };

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
        {isLoggedIn ? (
          <Flex alignItems="center" gap={2}>
            <Flex
              bg="var(--lvl3-darkcolor)"
              border="var(--bordercolor) solid 1px"
              rounded="5px"
              h="35px"
              w="35px"
              alignItems="center"
              justifyContent="center"
              fontSize="md"
            >
              <IoNotifications />
            </Flex>

            <Menu>
              <MenuButton
                as={Flex}
                rounded={5}
                h="35px"
                fontSize="18px"
                cursor={"pointer"}
                _hover={{ bg: "var(--lvl1-darkcolor)" }}
                onClick={handleMenuToggle}
                w={"max-content"}
              >
                <Flex
                  bg="var(--lvl3-darkcolor)"
                  border="var(--bordercolor) solid 1px"
                  rounded="5px"
                  h="35px"
                  w="35px"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="md"
                >
                  <FaUserAstronaut />
                </Flex>
              </MenuButton>
              {showMenu && (
                <MenuList
                  bg={"var(--lvl1-darkcolor)"}
                  borderColor={"var(--bordercolor)"}
                >
                  <MenuItem
                    bg={"var(--lvl1-darkcolor)"}
                    _hover={{
                      bg: "var(--lvl1-darkcolor)",
                      border: "transparent 1px solid",
                      color: "var(--chakra-colors-chakra-body-text)",
                    }}
                    justifyContent={"center"}
                  >
                    {UserName}
                  </MenuItem>
                  <Divider w={"90%"} m={"auto"} />
                  <MenuItem
                    mt={3}
                    bg={"var(--lvl1-darkcolor)"}
                    _hover={{
                      bg: "var(--lvl3-darkcolor)",
                      border: "transparent 1px solid",
                      color: "var(--chakra-colors-chakra-body-text)",
                    }}
                    icon={<IoIosSettings />}
                  >
                    Settings
                  </MenuItem>
                  <MenuItem
                    bg={"var(--lvl1-darkcolor)"}
                    _hover={{
                      bg: "var(--lvl3-darkcolor)",
                      border: "transparent 1px solid",
                      color: "var(--chakra-colors-chakra-body-text)",
                    }}
                    icon={<FaMoon />}
                  >
                    Theme Mode
                  </MenuItem>
                  <MenuItem
                    bg={"var(--lvl1-darkcolor)"}
                    _hover={{
                      bg: "var(--lvl3-darkcolor)",
                      border: "transparent 1px solid",
                      color: "var(--chakra-colors-chakra-body-text)",
                    }}
                    onClick={handleLogout}
                    icon={<IoMdLogOut />}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              )}
            </Menu>
          </Flex>
        ) : (
          <>
            <Flex alignItems="center" rounded="5px" padding="5px 20px">
              <Link to="/login">
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
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
