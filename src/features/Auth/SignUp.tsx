import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Image,
  Text,
  Divider,
} from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import bgImage from "../../assets/bgAuth.png";
import { FaGoogle } from "react-icons/fa6";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
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
        h={480}
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
          <Heading fontSize={"xl"} mb="3">
            Sign Up
          </Heading>
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
            Sign up with Google
          </Button>
          <Divider borderColor={"var(--bordercolor)"} my={5}></Divider>
          <form onSubmit={handleSubmit}>
            <FormControl mb="5" isRequired>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb="5" isRequired>
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
            >
              Sign Up
            </Button>
          </form>
        </Box>
        <Box
          position={"absolute"}
          top={"-120px"}
          right={"-250px"}
          opacity={".2"}
        >
          <Image src={bgImage} w={600}></Image>
        </Box>
      </Flex>
    </Box>
  );
};

export default SignUp;
