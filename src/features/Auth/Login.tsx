import { useState } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  Image,
  Text,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa6";

import logo from "../../assets/logo.png";
import bgImage from "../../assets/bgAuth.png";
import { useUserStore } from "../../stores/user";
import { redirect } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const { login } = useUserStore();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData);
      toast({
        title: "Success",
        description: "Logged in successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      redirect("/dashboard");
    } catch (error: any) {
      console.error("Error logging in:", error);

      if (error.response && error.response.data.message) {
        toast({
          title: "Error",
          description: error.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to log in. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
    setLoading(false);
  };

  return (
    <Box>
      <Flex
        overflow={"hidden"}
        position={"relative"}
        py={5}
        justifyContent="space-between"
        alignItems="center"
        w={450}
        h={478}
        m={"100px auto"}
        bg={"var(--lvl3-darkcolor)"}
        rounded={20}
        flexDirection={"column"}
      >
        <Flex alignItems={"center"} gap={2}>
          <Image h={"40px"} w={"40px"} src={logo}></Image>
          <Text fontSize="3xl">DailyCure</Text>
        </Flex>
        <Box maxWidth="400px" width="100%">
          <Button
            w={"100%"}
            border={"1px solid "}
            borderColor={"purple.400"}
            bg={"var(--lvl1-darkcolor)"}
            color={"var(--chakra-colors-chakra-body-text)"}
            _hover={{
              bg: "var(--lvl2-darkcolor)",
              color: "var(--chakra-colors-chakra-body-text)",
            }}
            leftIcon={<FaGoogle />}
          >
            Login with Google
          </Button>
          <Flex my={5} gap={2} alignItems={"center"}>
            <Divider borderColor={"var(--bordercolor)"}></Divider>
            <Text w={"200px"} textAlign={"center"}>
              Login
            </Text>
            <Divider borderColor={"var(--bordercolor)"}></Divider>
          </Flex>
          <form onSubmit={handleSubmit}>
            <FormControl mb="5" isRequired>
              <FormLabel color={"purple.100"}>Email</FormLabel>

              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb="5" isRequired>
              <FormLabel color={"purple.100"}>Password</FormLabel>

              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>
            <Button
              color={"var(--chakra-colors-chakra-body-text)"}
              bg={"var(--maincolor)"}
              _hover={{
                bg: "var(--hover-maincolor)",
                color: "var(--chakra-colors-chakra-body-text)",
              }}
              mt={5}
              w={"100%"}
              type="submit"
              isLoading={loading}
              loadingText="Loging in..."
            >
              Login
            </Button>
          </form>
        </Box>
        <Box
          position={"absolute"}
          top={"-120px"}
          right={"-250px"}
          opacity={".1"}
        >
          <Image src={bgImage} w={600}></Image>
        </Box>
      </Flex>
    </Box>
  );
};

export default Login;
