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
} from "@chakra-ui/react";
import logo from "../../assets/logo.png";

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
    <Flex
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
        <form onSubmit={handleSubmit}>
          <FormControl mb="5" isRequired>
            <FormLabel color={"purple.100"} htmlFor="name">
              Name
            </FormLabel>
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
            <FormLabel color={"purple.100"} htmlFor="email">
              Email Address
            </FormLabel>
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
            <FormLabel color={"purple.100"} htmlFor="password">
              Password
            </FormLabel>
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
    </Flex>
  );
};

export default SignUp;
