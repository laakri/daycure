import { Box, Heading, Text, Button, Wrap } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <Box textAlign="center" p={8} mt={50}>
      <Heading size="2xl" mb={4}>
        Welcome to DailyCure!
      </Heading>
      <Box maxW={"md"} m={"auto"}>
        <Text fontSize="lg" mb={6} textAlign={"center"}>
          Embrace a life of balance and productivity with My DailyCure. We offer
          a suite of tools designed to enhance your daily routine and
          well-being.
        </Text>
      </Box>
      <Button
        bg="gray.800"
        color={"gray.100"}
        size="md"
        as={Link}
        _hover={{
          bg: "gray.700",
          color: "gray.100",
        }}
        to="/dashboard"
      >
        Explore Now
      </Button>
      <Wrap
        display={"flex"}
        w={"100%"}
        spacing={5}
        mt={"55px"}
        justifyContent="center"
        alignItems="center"
      >
        <Box
          p={6}
          maxW="310px"
          borderWidth="1px"
          borderRadius="lg"
          border="1px solid"
          borderColor={"purple.700"}
        >
          <Heading size="lg" mb={4}>
            Manage Finances
          </Heading>
          <Text fontSize="md">
            Effortlessly track your income, expenses, and savings. Achieve your
            monetary goals with ease.
          </Text>
        </Box>
        <Box
          p={6}
          maxW="310px"
          borderWidth="1px"
          borderRadius="lg"
          border="1px solid"
          borderColor={"purple.700"}
        >
          <Heading size="lg" mb={4}>
            Stay Productive
          </Heading>
          <Text fontSize="md">
            Create and organize tasks efficiently. Boost your productivity and
            accomplish more each day.
          </Text>
        </Box>
        <Box
          p={6}
          maxW="310px"
          borderWidth="1px"
          borderRadius="lg"
          border="1px solid"
          borderColor={"purple.700"}
        >
          <Heading size="lg" mb={4}>
            Get Daily News
          </Heading>
          <Text fontSize="md">
            Stay informed with the latest news in various categories – from
            technology to entertainment.
          </Text>
        </Box>
        <Box
          p={6}
          maxW="310px"
          borderWidth="1px"
          borderRadius="lg"
          border="1px solid"
          borderColor={"purple.700"}
        >
          <Heading size="lg" mb={4}>
            Track Your Fitness
          </Heading>
          <Text fontSize="md">
            Achieve your fitness goals with dedicated tracking features. Monitor
            your workouts and lead a healthier lifestyle.
          </Text>
        </Box>
      </Wrap>
    </Box>
  );
};

export default Homepage;
