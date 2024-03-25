import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Wrap,
  Image,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import { GiHand, GiSoundWaves } from "react-icons/gi";
import { SlFire } from "react-icons/sl";
import { LuHeartPulse } from "react-icons/lu";
import { GoPulse } from "react-icons/go";
import { IoFootstepsOutline } from "react-icons/io5";
import { GiFootsteps } from "react-icons/gi";
import { GiNightSleep } from "react-icons/gi";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { IoMdFitness } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const FitnessDashboard: React.FC = () => {
  return (
    <Box>
      <Flex gap={10}>
        <Flex flexDirection={"column"}>
          <Flex gap={2} justifyContent={"left"} alignItems={"center"}>
            <Text fontSize={"19px"}>Good Morning,</Text>
            <Text as={"b"} fontSize={"19px"}>
              Seima{" "}
            </Text>
            <GiHand color="yellow" size={"25"} />
          </Flex>
          <Flex>
            <Text>Let's do some workout today</Text>
          </Flex>
          <Flex mt={10} gap={5}>
            <Box
              minW={"200px"}
              borderRadius={"5px"}
              p={2}
              background={
                "linear-gradient(30deg, #08051a96 0%, #3a3c6161 100%, #3a3c61 100%)"
              }
              backdropFilter={"blur(10px)"} /* Appliquer un flou */
            >
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Text>Calories</Text>
                <SlFire size={20} />
              </Flex>
              <Flex justifyContent={"center"}>
                <GiSoundWaves size={95} color="gray" />{" "}
              </Flex>
              <Flex gap={1} alignItems={"end"}>
                <Text as={"b"} fontSize={"18"} color={"#6049e2"}>
                  1485
                </Text>
                <Text>Kcal</Text>
              </Flex>
            </Box>
            <Box
              minW={"200px"}
              borderRadius={"5px"}
              p={2}
              background={
                "linear-gradient(30deg, #08051a96 0%, #3a3c6161 100%, #3a3c61 100%)"
              }
              backdropFilter={"blur(10px)"} /* Appliquer un flou */
            >
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Text>Heart rate</Text>
                <LuHeartPulse size={20} />
              </Flex>
              <Flex justifyContent={"center"}>
                <GoPulse size={95} color="gray" />{" "}
              </Flex>
              <Flex gap={1} alignItems={"end"}>
                <Text as={"b"} fontSize={"18"} color={"#6049e2"}>
                  104
                </Text>
                <Text>Bpm/min</Text>
              </Flex>
            </Box>
            <Box
              minW={"200px"}
              borderRadius={"5px"}
              p={2}
              background={
                "linear-gradient(30deg, #08051a96 0%, #3a3c6161 100%, #3a3c61 100%)"
              }
              backdropFilter={"blur(10px)"} /* Appliquer un flou */
            >
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Text>Steps</Text>
                <IoFootstepsOutline size={20} />
              </Flex>
              <Flex justifyContent={"center"}>
                <GiFootsteps size={95} color="gray" />{" "}
              </Flex>
              <Flex gap={1} alignItems={"end"}>
                <Text as={"b"} fontSize={"18"} color={"#6049e2"}>
                  9885
                </Text>
                <Text>Step</Text>
              </Flex>
            </Box>
            <Box
              minW={"200px"}
              borderRadius={"5px"}
              p={2}
              background={
                "linear-gradient(30deg, #08051a96 0%, #3a3c6161 100%, #3a3c61 100%)"
              }
              backdropFilter={"blur(10px)"} /* Appliquer un flou */
            >
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Text>sleep</Text>
                <GiNightSleep size={20} />
              </Flex>
              <Flex justifyContent={"center"}>
                <GiSoundWaves size={95} color="gray" />{" "}
              </Flex>
              <Flex gap={1} alignItems={"end"}>
                <Text as={"b"} fontSize={"18"} color={"#6049e2"}>
                  8.5
                </Text>
                <Text>H/day</Text>
              </Flex>
            </Box>
          </Flex>

          <Flex
            mt={9}
            p={2}
            border={"1px solid "}
            borderColor={"gray.900"}
            borderRadius={5}
            direction={"column"}
            gap={5}
          >
            <Flex gap={"680px"} justifyContent={"space-between"}>
              <Text>Daily Exercices</Text>
              <Text color={"gray"}>
                View All
                <ChevronDownIcon fontSize={20} color={"gray"} />
              </Text>
            </Flex>
            <Flex>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Name of exercice</Th>
                    <Th>Rpes</Th>
                    <Th>Set</Th>
                    <Th>Result</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <Flex gap={3}>
                        <WrapItem>
                          <Avatar
                            size="sm"
                            bg={"purple.700"}
                            icon={<Icon as={IoMdFitness} fontSize={"18px"} />}
                          />
                        </WrapItem>
                        <Flex direction={"column"}>
                          <Text>Bicepes And Lower-Core</Text>
                          <Text color={"gray"}>vit@h.com</Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td color={"gray"}>20 into 15 Repetation</Td>
                    <Td color={"gray"}>26 set</Td>
                    <Td>
                      <Flex gap={3} alignItems={"center"}>
                        <AiOutlineLoading3Quarters />
                        <Text>25.4%</Text>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Flex gap={3}>
                        <WrapItem>
                          <Avatar
                            size="sm"
                            bg={"purple.700"}
                            icon={<Icon as={IoMdFitness} fontSize={"18px"} />}
                          />
                        </WrapItem>
                        <Flex direction={"column"}>
                          <Text>Bicepes And Lower-Core</Text>
                          <Text color={"gray"}>vit@h.com</Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td color={"gray"}>20 into 15 Repetation</Td>
                    <Td color={"gray"}>26 set</Td>
                    <Td>
                      <Flex gap={3} alignItems={"center"}>
                        <AiOutlineLoading3Quarters />
                        <Text>25.4%</Text>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Flex gap={3}>
                        <WrapItem>
                          <Avatar
                            size="sm"
                            bg={"purple.700"}
                            icon={<Icon as={IoMdFitness} fontSize={"18px"} />}
                          />
                        </WrapItem>
                        <Flex direction={"column"}>
                          <Text>Bicepes And Lower-Core</Text>
                          <Text color={"gray"}>vit@h.com</Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td color={"gray"}>20 into 15 Repetation</Td>
                    <Td color={"gray"}>26 set</Td>
                    <Td>
                      <Flex gap={3} alignItems={"center"}>
                        <AiOutlineLoading3Quarters />
                        <Text>25.4%</Text>
                      </Flex>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Flex>
          </Flex>
          <Flex direction={"column"} mt={5}>
            <Flex justifyContent={"space-between"}>
              <Text fontSize={20}>Diet Plan</Text>
              <Text color={"gray"}>
                Edit diet plan
                <ChevronDownIcon fontSize={20} color={"gray"} />
              </Text>
            </Flex>
            <Wrap spacing="10px" mt={5}>
              <WrapItem>
                <Center
                  w="285px"
                  h="150px"
                  p={2}
                  border={"1px solid"}
                  borderColor={"gray.700"}
                  borderRadius={5}
                >
                  <Flex gap={3}>
                    <Flex direction={"column"} maxW={"140px"}>
                      <Text as={"b"}>Fruits only</Text>
                      <Text color={"gray"}>
                        it contains most water contain in it
                      </Text>
                      <Button
                        colorScheme="teal"
                        w={"70px"}
                        borderRadius={50}
                        variant="outline"
                      >
                        Day1
                      </Button>
                    </Flex>
                    <Box>
                      <Image
                        boxSize="100px"
                        borderRadius={"50%"}
                        objectFit="cover"
                        src="https://www.momontimeout.com/wp-content/uploads/2021/06/fruit-salad-square.jpeg"
                        alt="Dan Abramov"
                      />
                    </Box>
                  </Flex>
                </Center>
              </WrapItem>
              <WrapItem>
                <Center
                  w="285px"
                  h="150px"
                  p={2}
                  border={"1px solid"}
                  borderColor={"gray.700"}
                  borderRadius={5}
                >
                  <Flex gap={3}>
                    <Flex direction={"column"} maxW={"140px"}>
                      <Text as={"b"}>Vegetables only</Text>
                      <Text color={"gray"}>
                        it contains most water contain in it
                      </Text>
                      <Button
                        colorScheme="teal"
                        w={"70px"}
                        borderRadius={50}
                        variant="outline"
                      >
                        Day2
                      </Button>
                    </Flex>
                    <Box>
                      <Image
                        boxSize="100px"
                        borderRadius={"50%"}
                        objectFit="cover"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFzLzLLjs7A2OLuovznrAAOIAl-PKvnwT6iA&usqp=CAU"
                        alt="Dan Abramov"
                      />
                    </Box>
                  </Flex>
                </Center>
              </WrapItem>
              <WrapItem>
                <Center
                  w="285px"
                  h="150px"
                  p={2}
                  border={"1px solid"}
                  borderColor={"gray.700"}
                  borderRadius={5}
                >
                  <Flex gap={3}>
                    <Flex direction={"column"} maxW={"140px"}>
                      <Text as={"b"}>Fruits and vegtebales </Text>
                      <Text color={"gray"}>
                        it contains most water contain in it
                      </Text>
                      <Button
                        colorScheme="teal"
                        w={"70px"}
                        borderRadius={50}
                        variant="outline"
                      >
                        Day3
                      </Button>
                    </Flex>
                    <Box>
                      <Image
                        boxSize="100px"
                        borderRadius={"50%"}
                        objectFit="cover"
                        src="https://food-guide.canada.ca/sites/default/files/styles/square_400_x_400/public/2020-12/CFGPlate-crop400x400.jpg"
                        alt="Dan Abramov"
                      />
                    </Box>
                  </Flex>
                </Center>
              </WrapItem>
            </Wrap>
          </Flex>
        </Flex>
        <Flex alignContent={"start"} gap={5} flexDirection={"column"}>
          <Flex gap={3} alignItems={"center"}>
            <WrapItem>
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            </WrapItem>
            <Flex direction={"column"}>
              <Text fontSize={"17"} as={"b"}>
                Seima zbedi
              </Text>
              <Text color={"gray"}>@seima2000</Text>
            </Flex>
            <ChevronDownIcon fontSize={20} color={"gray"} />
          </Flex>

          <Flex
          justifyContent={'space-between'}
            mt={5}
            border={"1px solid "}
            borderColor={"gray.700"}
            backgroundColor={"rgba(22, 22, 22, 0.123)"}
            p={5}
            borderRadius={5}
          >
            <Flex direction={"column"} alignItems={"center"}>
              <Text as={"b"} fontSize={"18"}>
                75 Kg
              </Text>
              <Text color={"gray.400"}>Weight</Text>
            </Flex>
            <Flex direction={"column"} alignItems={"center"}>
              <Text as={"b"} fontSize={"18"}>
                161 cm
              </Text>
              <Text color={"gray.400"}>Height</Text>
            </Flex>
            <Flex direction={"column"} alignItems={"center"}>
              <Text as={"b"} fontSize={"18"}>
                23 yrs
              </Text>
              <Text color={"gray.400"}>Age</Text>
            </Flex>
          </Flex>
          <Flex direction={"column"}>
            <Flex justifyContent={'space-between'}>
            <Text fontSize={18}>Exercises Packs </Text>
            <Button colorScheme='purple' variant='outline'>
    Add Pack
  </Button>
            </Flex>
            <Wrap mt={5}>
              <WrapItem>
                <Center
                  w="180px"
                  h="80px"
                  border={"1px solid"}
                  borderColor={"gray.700"}
                  borderRadius={5}
                  justifyContent={"left"}
                  p={3}
                >
                  <Flex direction={"column"} justifyContent={"left"}>
                    <Text as={"b"}>ABS & Stretch</Text>
                    <Text color={"gray"}>20 Exercises</Text>
                    <Text color={"purple.300"}>See more</Text>
                  </Flex>
                </Center>
              </WrapItem>
              <WrapItem>
                <Center
                  w="180px"
                  h="80px"
                  border={"1px solid"}
                  borderColor={"gray.700"}
                  borderRadius={5}
                  justifyContent={"left"}
                  p={3}
                >
                  <Flex direction={"column"} justifyContent={"left"}>
                    <Text as={"b"}>ABS & Stretch</Text>
                    <Text color={"gray"}>20 Exercises</Text>
                    <Text color={"purple.300"}>See more</Text>
                  </Flex>
                </Center>
              </WrapItem>
              <WrapItem>
                <Center
                  w="180px"
                  h="80px"
                  border={"1px solid"}
                  borderColor={"gray.700"}
                  borderRadius={5}
                  justifyContent={"left"}
                  p={3}
                >
                  <Flex direction={"column"} justifyContent={"left"}>
                    <Text as={"b"}>ABS & Stretch</Text>
                    <Text color={"gray"}>20 Exercises</Text>
                    <Text color={"purple.300"}>See more</Text>
                  </Flex>
                </Center>
              </WrapItem>
              <WrapItem>
                <Center
                  w="180px"
                  h="80px"
                  border={"1px solid"}
                  borderColor={"gray.700"}
                  borderRadius={5}
                  justifyContent={"left"}
                  p={3}
                >
                  <Flex direction={"column"} justifyContent={"left"}>
                    <Text as={"b"}>ABS & Stretch</Text>
                    <Text color={"gray"}>20 Exercises</Text>
                    <Text color={"purple.300"}>See more</Text>
                  </Flex>
                </Center>
              </WrapItem>
            </Wrap>
            
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default FitnessDashboard;
