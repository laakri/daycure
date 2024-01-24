// Circles.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  TableContainer,
  Table,
  TableCaption,
  Tr,
  Tbody,
  Td,
  WrapItem,
  Avatar,
  IconButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  AddIcon,
  DragHandleIcon,
} from "@chakra-ui/icons";

interface CircleProps {
  radius: number;
  fill: string;
  position?: { x: number; y: number };
  backgroundImage?: string;
  onClick: () => void;
}

const Circle: React.FC<CircleProps> = ({
  radius,
  fill,
  position,
  backgroundImage,
  onClick,
}) => {
  return (
    <motion.div
      style={{
        width: radius * 2,
        height: radius * 2,
        borderRadius: "50%",
        backgroundColor: fill,
        position: "absolute",
        left: position?.x,
        top: position?.y,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      whileHover={{ scale: 1.2, rotate: 90 }}
      whileTap={{ scale: 0.8, rotate: -90, borderRadius: "100%" }}
      onClick={onClick}
    />
  );
};

interface CirclesProps {
  radius: number;
  smallRadius: number;
  count: number;
  smallCircleImages: string[];
  modalContent: React.ReactNode[]; // Ajouter une propriété pour le contenu du modèle
}

const Circles: React.FC<CirclesProps> = ({
  radius,
  smallRadius,
  count,
  smallCircleImages,
  modalContent,
}) => {
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const [selectedModal, setSelectedModal] = useState<number | null>(null);

  useEffect(() => {
    const newPositions: { x: number; y: number }[] = [];
    for (let i = 0; i < count; i++) {
      const angle = ((2 * Math.PI) / count) * i;
      const x = radius + radius * Math.cos(angle) - 60;
      const y = radius * Math.sin(angle) + 40;
      newPositions.push({ x, y });
    }
    setPositions(newPositions);
  }, [radius, smallRadius, count]);

  const handleCircleClick = (index: number) => {
    setSelectedModal(index);
  };

  const handleCloseModal = () => {
    setSelectedModal(null);
  };

  return (
    <>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Wallets and Expense Tracking
      </Text>
      <div
        style={{
          borderRadius: "50px",
          marginBottom: "80px",
          padding: "10px",
          display: "flex",
          gap: "50px",
          justifyContent: "left",
        }}
      >
        <Box
          minW={"800px"}
          border="solid 1px var(--bordercolor)"
          bg="var(--lvl1-darkcolor)"
          borderRadius={20}
          position="relative"
          p={5}
        >
          <Text fontSize="xl" p={5}>
            All Category
          </Text>
          <Box
            position={"absolute"}
            right="10px"
            top={"10px"}
            color={"gray"}
            fontSize={20}
          >
            <button>
              <DragHandleIcon />
            </button>
          </Box>

          <TableContainer>
            <Table variant="simple">
              <TableCaption>
                <Button bg={"gray"} ml={"570px"}>
                  Add Category
                </Button>
              </TableCaption>

              <Tbody>
                <Tr>
                  <Td maxW={"20px"}>
                    <WrapItem>
                      <Avatar
                        size="lg"
                        name="Prosper Otemuyiwa"
                        bg="gray"
                        src="https://cdn3d.iconscout.com/3d/premium/thumb/electric-5282500-4413093.png"
                      />{" "}
                    </WrapItem>
                  </Td>
                  <Td>Electricity </Td>
                  <Td isNumeric color={"red"}>
                    <Box
                      display={"flex"}
                      gap={"5"}
                      alignItems={"center"}
                      justifyContent={"right"}
                    >
                      <Text>-25.4 $</Text>

                      <IconButton
                        isRound={true}
                        variant="solid"
                        colorScheme="teal"
                        aria-label="Done"
                        fontSize="20px"
                        icon={<AddIcon />}
                      />
                    </Box>
                  </Td>
                </Tr>
                <Tr>
                  <Td maxW={"20px"}>
                    <WrapItem>
                      <Avatar
                        size="lg"
                        name="Prosper Otemuyiwa"
                        bg="gray"
                        src="https://cdn3d.iconscout.com/3d/free/thumb/free-spotify-9425641-7656433.png?f=webp"
                      />{" "}
                    </WrapItem>
                  </Td>
                  <Td>Spotify subscr</Td>
                  <Td isNumeric color={"red"}>
                  <Box
                      display={"flex"}
                      gap={"5"}
                      alignItems={"center"}
                      justifyContent={"right"}
                    >
                      <Text>-25.4 $</Text>

                      <IconButton
                        isRound={true}
                        variant="solid"
                        colorScheme="teal"
                        aria-label="Done"
                        fontSize="20px"
                        icon={<AddIcon />}
                      />
                    </Box>
                  </Td>
                </Tr>
                <Tr>
                  <Td maxW={"20px"}>
                    <WrapItem>
                      <Avatar
                        size="lg"
                        name="Prosper Otemuyiwa"
                        bg="gray"
                        src="https://cdn3d.iconscout.com/3d/premium/thumb/crystal-fortune-9188402-7660612.png?f=webp"
                      />{" "}
                    </WrapItem>
                  </Td>
                  <Td>Hobby </Td>
                  <Td isNumeric color={"red"}>
                  <Box
                      display={"flex"}
                      gap={"5"}
                      alignItems={"center"}
                      justifyContent={"right"}
                    >
                      <Text>-25.4 $</Text>

                      <IconButton
                        isRound={true}
                        variant="solid"
                        colorScheme="teal"
                        aria-label="Done"
                        fontSize="20px"
                        icon={<AddIcon />}
                      />
                    </Box>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

        <Box
          border="solid 1px var(--bordercolor)"
          borderRadius={20}
          minW={"400px"}
          display="flex"
          pr={"60px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <div
            style={{
              position: "relative",
              width: radius * 2,
              height: radius * 2,
              marginLeft: "50px",
            }}
          >
            <Circle
              radius={radius}
              fill="rgba(62, 62, 62, 0.264)"
              onClick={handleCloseModal}
            />
            {positions.map((position, i) => (
              <Box
                as={motion.div}
                key={i}
                drag="x"
                dragConstraints={{ left: -100, right: 100 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition="0.5s linear"
              >
                <Circle
                  radius={smallRadius}
                  fill=""
                  position={position}
                  backgroundImage={smallCircleImages[i]}
                  onClick={() => handleCircleClick(i)}
                />
              </Box>
            ))}
            {selectedModal !== null && (
              <Modal isOpen={selectedModal !== null} onClose={handleCloseModal}>
                <ModalOverlay />
                <ModalContent
                  bg="var(--lvl1-darkcolor)"
                  maxW={"650px"}
                  border="solid 1px var(--bordercolor)"
                  marginTop={"250px"}
                >
                  <ModalHeader color={"black"}>
                    <Heading
                      as="h2"
                      size="2xl"
                      color={"#fff"}
                      textAlign={"center"}
                    >
                      Wallet Transactions
                    </Heading>
                  </ModalHeader>
                  <ModalCloseButton bg={"#ffb802"} margin={2} />
                  <ModalBody>{modalContent[selectedModal]}</ModalBody>
                  <ModalFooter pt={0}>
                    <Button
                      fontSize="15px"
                      minW={"150px"}
                      borderColor={"white"}
                      bg={"transparent"}
                      color={"white"}
                      mr={3}
                      onClick={handleCloseModal}
                    >
                      Save
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            )}
          </div>
        </Box>
      </div>
    </>
  );
};

Circles.defaultProps = {
  radius: 100,
  smallRadius: 50,
  count: 2,
  smallCircleImages: [],
  modalContent: [], // Initialiser avec un tableau vide
};

export default Circles;
