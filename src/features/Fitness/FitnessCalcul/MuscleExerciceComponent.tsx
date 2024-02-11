import {
  Flex,
  Text,
  Box,
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalBody,
  Stack,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  Divider,
  Heading,
} from "@chakra-ui/react";
import { LiaWeightSolid } from "react-icons/lia";
import { GiMuscleUp } from "react-icons/gi";
import React, { useState } from "react";
import { VscDebugStart } from "react-icons/vsc";
import { PiPauseBold, PiStopBold } from "react-icons/pi";
import { IoIosFitness } from "react-icons/io";
import { IoMdStopwatch } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ImPower } from "react-icons/im";

const MuscleExerciceComponent: React.FC = () => {
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
    swipeToSlide: true,
  };

  // Définition de l'état initial du chronomètre
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Box w={1000} mt={20}>
      <Heading as="h2" size="3xl" textAlign={"center"}>
        what is your goal
      </Heading>
      <Text fontSize="3xl" textAlign={"center"}>
        achieve your goal with your personalized program
      </Text>
      <Flex mt={"60px"} gap={20} ml={"55px"}>
        <Button
          border={"var(--bordercolor) solid 1px"}
          p={"5px 8px "}
          rounded={8}
          w={"240px"}
          gap={2}
          alignContent={"center"}
          alignItems={"center"}
          justifyContent={"center"}
          bg={"purple.600"}
        >
          <LiaWeightSolid size={25} />
          <Text> Losing weight</Text>
        </Button>
        <Button
          border={"var(--bordercolor) solid 1px"}
          p={"5px 8px "}
          rounded={8}
          w={"240px"}
          gap={2}
          alignContent={"center"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <GiMuscleUp size={25} />
          <Text> Tone up</Text>
        </Button>
        <Button
          border={"var(--bordercolor) solid 1px"}
          p={"5px 8px "}
          rounded={8}
          w={"240px"}
          gap={2}
          alignContent={"center"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <IoIosFitness size={25} />
          <Text> strengthen your muscles</Text>
        </Button>
      </Flex>

      <Flex mt={"50px"} mb={4}>
        <Text fontSize="xl">Exercises</Text>
      </Flex>
      <Box className="slider-container">
        <Slider {...settings}>
          <Box
            border={"1px solid"}
            borderColor={"gray.700"}
            rounded={10}
            h={"150px"}
          >
            <Text>1</Text>
          </Box>
          <Box
            border={"1px solid"}
            borderColor={"gray.700"}
            rounded={10}
            h={"150px"}
          >
            <Text>2</Text>
          </Box>
          <Box
            border={"1px solid"}
            borderColor={"gray.700"}
            rounded={10}
            h={"150px"}
          >
            <Text>3</Text>
          </Box>

          <Box
            border={"1px solid"}
            borderColor={"gray.700"}
            rounded={10}
            h={"150px"}
          >
            <Text>8</Text>
          </Box>
        </Slider>
      </Box>
      <Flex justifyContent={"center"} m={"50px"}>
        <Button
          h="40px"
          w={"150px"}
          size="2xl"
          color="white"
          bg={"gray.800"}
          _hover={{
            bg: "var(--maincolor)",
            color: "var(--chakra-colors-chakra-body-text)",
          }}
          onClick={() => handleOpenModal()}
        >
          <Text> Start</Text>
        </Button>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent
            bg="var(--lvl1-darkcolor)"
            border="solid 1px "
            borderColor="gray.700"
            marginTop={"150px"}
            minWidth={"990px"}
          >
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex gap={10}>
                <Box
                  w={"550px"}
                  h={"500px"}
                  border={"1px solid"}
                  borderColor={"gray.800"}
                  rounded={10}
                  backgroundImage={
                    "https://imgs.search.brave.com/moK7v8MIzwCMTfSgtHzLmYEMAhwsY2tLINl3Ybfu9Sk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jb250/ZW50cy5tZWRpYWRl/Y2F0aGxvbi5jb20v/czgxOTkzMy9rJDVj/OWJjYWJiMGFlMmM3/NDA4NDM0ZmZlYWFm/ZWYxY2IyLzUwMHgw/LzI3MzZwdDE4MjQv/NDU2MHhjcjM2NDgv/bXVzY3VsYXRpb24t/cGxlaW4tYWlyLmpw/Zz9mb3JtYXQ9YXV0/bw"
                  }
                  backgroundRepeat={"no-repeat"}
                  backgroundSize={"cover"}
                ></Box>
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  direction={"column"}
                  gap={3}
                >
                  <Box>
                    <IoMdStopwatch size={50} />
                  </Box>
                  <Stack
                    spacing={3}
                    direction="row"
                    alignItems="center"
                    minW={"350px"}
                    h={"80px"}
                    rounded={20}
                  >
                    <Text fontSize="3xl" m={"auto"} fontWeight={"bold"}>
                      {String(time.hours).padStart(2, "0")} :{" "}
                      {String(time.minutes).padStart(2, "0")} :{" "}
                      {String(time.seconds).padStart(2, "0")}
                    </Text>
                  </Stack>
                  <Flex gap={10}>
                    <Button
                      border={"var(--bordercolor) solid 1px"}
                      p={"5px 8px "}
                      rounded={8}
                      w={"100px"}
                      gap={2}
                      bg={"transparent"}
                      alignContent={"center"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <VscDebugStart size={15} />
                      <Text> Start</Text>
                    </Button>
                    <Button
                      border={"var(--bordercolor) solid 1px"}
                      p={"5px 8px "}
                      rounded={8}
                      bg={"transparent"}
                      w={"100px"}
                      gap={2}
                      alignContent={"center"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <PiPauseBold size={15} />
                      <Text> Pause</Text>
                    </Button>
                    <Button
                      border={"var(--bordercolor) solid 1px"}
                      p={"5px 8px "}
                      rounded={8}
                      w={"100px"}
                      bg={"transparent"}
                      gap={2}
                      alignContent={"center"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <PiStopBold size={15} />
                      <Text> Stop</Text>
                    </Button>
                  </Flex>
                  <Flex
                    bg={"var(--lvl3-darkcolor)"}
                    w={"400px"}
                    h={"50px"}
                    rounded={10}
                    pr={"20px"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    mt={10}
                  >
                    <Flex
                      justifyContent={"center"}
                      alignItems={"center"}
                      p={"2px 7px"}
                      gap={2}
                      color={"purple.100"}
                      w={"110px"}
                      maxH={"30px"}
                    >
                      <ImPower />
                      <Text>Calories</Text>
                    </Flex>
                    <Text fontSize={"l"} fontWeight={"bold"}>
                      {" "}
                      + 50 Kcal
                    </Text>
                  </Flex>
                  <Flex
                    bg={"var(--lvl3-darkcolor)"}
                    w={"400px"}
                    h={"50px"}
                    rounded={10}
                    pr={"20px"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Flex
                      justifyContent={"center"}
                      alignItems={"center"}
                      p={"2px 7px"}
                      gap={2}
                      color={"purple.100"}
                      w={"110px"}
                      maxH={"30px"}
                    >
                      <ImPower />
                      <Text>Calories</Text>
                    </Flex>
                    <Text fontSize={"l"} fontWeight={"bold"}>
                      {" "}
                      + 50 Kcal
                    </Text>
                  </Flex>
                  <Flex >
                  <Button
                      border={"var(--bordercolor) solid 1px"}
                      p={"5px 8px "}
                      rounded={8}
                      w={"100px"}
                      gap={2}
                      bg={"purple.600"}
                      alignContent={"center"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Text> Next</Text>
                      <VscDebugStart size={15} />

                    </Button></Flex>
                </Flex>
                
              </Flex>
              
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Box>
  );
};

export default MuscleExerciceComponent;
