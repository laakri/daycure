import { Text, Flex, Input, Button, Box, InputRightElement, InputGroup } from "@chakra-ui/react";

const CaloriesComponent = () => {
  return (
    <Flex flexDirection={"column"} gap={2}>
     
      <Flex gap={10}>
        <Box display={'flex'} flexDirection={'column'} gap={'2'}>
        <Text fontSize={"xl"} color={"purple.100"}>
        Ideal Weight Calculator
      </Text>
      <Input
        placeholder="Age"
        bg={"var(--lvl1-darkcolor)"}
        h={"40px"}
        border={"1px solid transparent"}
      />

      <Input
        placeholder="Height"
        bg={"var(--lvl1-darkcolor)"}
        h={"40px"}
        border={"1px solid transparent"}
      />

      <Button
        color={"var(--chakra-colors-chakra-body-text)"}
        bg={"var(--maincolor)"}
        _hover={{
          bg: "var(--hover-maincolor)",
          color: "var(--chakra-colors-chakra-body-text)",
        }}
        mt={5}
        w={"100%"}
      >
        Calcul
      </Button>
      </Box>
      <Box display={'flex'} flexDirection={'column'} gap={'2'}>
      <Text fontSize={"xl"} color={"purple.100"}>
        Healthy BMI Range
      </Text>
      <InputGroup>
        <Input
          placeholder="Healthy BMI Range"
          bg={"var(--lvl1-darkcolor)"}
          textAlign={"center"}
          h={"100px"}
          fontSize={"50px"}
          border={"1px solid transparent"}
          mb={"10px"}
         disabled
        />
        <InputRightElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
        >
          Kg
        </InputRightElement>
      </InputGroup>
      </Box>
      </Flex>
    </Flex>
  );
};

export default CaloriesComponent;
