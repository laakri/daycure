import {
  Box,
  Flex,
  Text,
  Button,
  Divider,
  InputGroup,
  Input,
  InputRightElement,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { TbHeartbeat } from "react-icons/tb";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { LiaTachometerAltSolid } from "react-icons/lia";
import { MdOutlineWaterDrop, MdNavigateNext } from "react-icons/md";
import { FaWalking } from "react-icons/fa";
import { BiCycling } from "react-icons/bi";
const StatsFitnessComponent: React.FC = () => {
  return (
    <Box>
      <Flex justifyContent={"space-between"}>
        <Text fontSize="2xl" fontWeight="bold" mt={15} mb={5}>
          Fitness Stats
        </Text>
        <Button
          mt={"23px"}
          h="1.95rem"
          size="13px"
          p={3}
          color="white"
          bg={"gray.800"}
          _hover={{
            bg: "var(--maincolor)",
            color: "var(--chakra-colors-chakra-body-text)",
          }}
        >
          Calcul others Stats
        </Button>
      </Flex>
      <Flex
        gap={10}
        bg={"var(--lvl1-darkcolor)"}
        border="1px solid " // Appliquer une bordure grise à la boîte
        borderColor={" var(--bordercolor)"}
        borderRadius={"20px"}
        p={"15px "}
        h={"300px"}
        alignItems={"center"}
      >
        <Box>
          <Box
            bg={"var(--lvl1-darkcolor)"}
            border="1px solid " // Appliquer une bordure grise à la boîte
            borderColor={" var(--bordercolor)"}
            borderRadius={"50%"}
            h={"max-content"}
            p={5}
            w={"190px"}
          >
            <Box display={"flex"} justifyContent={"center"}>
              <TbHeartbeat size={"30"} color="red" />
            </Box>
            <Text fontSize="6xl" fontWeight="bold" textAlign={"center"}>
              96
            </Text>
            <Text fontSize="m" color={"gray.500"} textAlign={"center"}>
              b/min
            </Text>
          </Box>
          <Text fontSize="l" fontWeight="bold" mt={2} textAlign={"center"}>
            HEARTRATE
          </Text>
        </Box>
        <Box>
          <Box
            bg={"var(--lvl1-darkcolor)"}
            border="1px solid " // Appliquer une bordure grise à la boîte
            borderColor={" var(--bordercolor)"}
            borderRadius={"50%"}
            h={"max-content"}
            p={5}
            w={"190px"}
          >
            <Box display={"flex"} justifyContent={"center"}>
              <AiOutlineThunderbolt size={"30"} color="#e8ff50e6" />
            </Box>
            <Text fontSize="6xl" fontWeight="bold" textAlign={"center"}>
              2102
            </Text>
            <Text fontSize="m" color={"gray.500"} textAlign={"center"}>
              Kcal
            </Text>
          </Box>
          <Text fontSize="l" fontWeight="bold" mt={2} textAlign={"center"}>
            CALORIES
          </Text>
        </Box>
        <Box>
          <Box
            bg={"var(--lvl1-darkcolor)"}
            border="1px solid " // Appliquer une bordure grise à la boîte
            borderColor={" var(--bordercolor)"}
            borderRadius={"50%"}
            h={"max-content"}
            p={5}
            w={"190px"}
          >
            <Box display={"flex"} justifyContent={"center"}>
              <LiaTachometerAltSolid size={"30"} color="#ffb050e6" />
            </Box>
            <Text fontSize="6xl" fontWeight="bold" textAlign={"center"}>
              20
            </Text>
            <Text fontSize="m" color={"gray.500"} textAlign={"center"}>
              %
            </Text>
          </Box>
          <Text fontSize="l" fontWeight="bold" mt={2} textAlign={"center"}>
            BMI
          </Text>
        </Box>
        <Box>
          <Box
            bg={"var(--lvl1-darkcolor)"}
            border="1px solid " // Appliquer une bordure grise à la boîte
            borderColor={" var(--bordercolor)"}
            borderRadius={"50%"}
            h={"max-content"}
            p={5}
            w={"190px"}
          >
            <Box display={"flex"} justifyContent={"center"}>
              <MdOutlineWaterDrop size={"30"} color="#50c2ffe6" />
            </Box>
            <Text fontSize="6xl" fontWeight="bold" textAlign={"center"}>
              2
            </Text>
            <Text fontSize="m" color={"gray.500"} textAlign={"center"}>
              L/jr
            </Text>
          </Box>
          <Text fontSize="l" fontWeight="bold" mt={2} textAlign={"center"}>
            WATER
          </Text>
        </Box>
      </Flex>
      <Flex justifyContent={"space-between"}>
        <Text fontSize="2xl" fontWeight="bold" mt={15} mb={5}>
          Workouts
        </Text>
        <InputGroup size="md" borderColor={"gray.700"} maxW={"250px"} mt={15}>
          <Input pr="4.5rem" placeholder="Search exercice " />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="xs"
              color="white"
              bg={"gray.800"}
              _hover={{
                bg: "var(--maincolor)",
                color: "var(--chakra-colors-chakra-body-text)",
              }}
            >
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Divider
        orientation="horizontal"
        borderColor="var(--bordercolor)"
        mb={5}
      />
      <Flex direction={'column'} gap={3}>
      <HStack
        bg={"var(--lvl3-darkcolor)"}
        p={"8px 15px "}
        rounded={10}
        justifyContent={"space-between"}
      >
        <Flex gap={2} alignItems={"center"}>
          <Flex alignItems={"center"} gap={3}>
            <Flex rounded={"50%"} bg={"purple.500"} p={2}>
              <FaWalking color={"black"} size={"20px"} />
            </Flex>
            <Text>Walking</Text>
          </Flex>
          <Flex
            alignItems={"center"}
            justifyContent={"end"}
            ml={"650px "}
            gap={1}
          >
            <Text color={"gray.500"}> +120 Exercice</Text>
            <Flex mt={"1px"}>
              <MdNavigateNext color={"gray.700"} />
            </Flex>
          </Flex>
        </Flex>
      </HStack>
      <HStack
        bg={"var(--lvl3-darkcolor)"}
        p={"8px 15px "}
        rounded={10}
        justifyContent={"space-between"}
      >
        <Flex gap={2} alignItems={"center"}>
          <Flex alignItems={"center"} gap={3}>
          <Flex rounded={"50%"} bg={"purple.500"} p={2}>

              <BiCycling color={"black"} size={"20px"} />
            </Flex>
            <Text>Cycling</Text>
          </Flex>
          <Flex
            alignItems={"center"}
            justifyContent={"end"}
            ml={"650px "}
            gap={1}
          >
            <Text color={"gray.500"}> +120 Exercice</Text>
            <Flex mt={"1px"}>
              <MdNavigateNext color={"gray.700"} />
            </Flex>
          </Flex>
        </Flex>
      </HStack>
      <HStack
        bg={"var(--lvl3-darkcolor)"}
        p={"8px 15px "}
        rounded={10}
        justifyContent={"space-between"}
      >
        <Flex gap={2} alignItems={"center"}>
          <Flex alignItems={"center"} gap={3}>
          <Flex rounded={"50%"} bg={"purple.500"} p={2}>

              <FaWalking color={"black"} size={"20px"} />
            </Flex>
            <Text>Walking</Text>
          </Flex>
          <Flex
            alignItems={"center"}
            justifyContent={"end"}
            ml={"650px "}
            gap={1}
          >
            <Text color={"gray.500"}> +120 Exercice</Text>
            <Flex mt={"1px"}>
              <MdNavigateNext color={"gray.700"} />
            </Flex>
          </Flex>
        </Flex>
      </HStack>
      <HStack
        bg={"var(--lvl3-darkcolor)"}
        p={"8px 15px "}
        rounded={10}
        justifyContent={"space-between"}
      >
        <Flex gap={2} alignItems={"center"}>
          <Flex alignItems={"center"} gap={3}>
          <Flex rounded={"50%"} bg={"purple.500"} p={2}>

              <FaWalking color={"black"} size={"20px"} />
            </Flex>
            <Text>Walking</Text>
          </Flex>
          <Flex
            alignItems={"center"}
            justifyContent={"end"}
            ml={"650px "}
            gap={1}
          >
            <Text color={"gray.500"}> +120 Exercice</Text>
            <Flex mt={"1px"}>
              <MdNavigateNext color={"gray.700"} />
            </Flex>
          </Flex>
        </Flex>
      </HStack>
      </Flex>
    </Box>
  );
};

export default StatsFitnessComponent;
