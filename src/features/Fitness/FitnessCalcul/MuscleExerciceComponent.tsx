import { Flex, Text, Stack, Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { VscDebugStart } from "react-icons/vsc";
import { PiPauseBold, PiStopBold } from "react-icons/pi";
const MuscleExerciceComponent: React.FC = () => {
  // Définition de l'état initial du chronomètre
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  return (
    <Box w={1000} mt={20}>
      <Flex
        justifyContent="center"
        alignItems="center"
        direction={"column"}
        gap={3}
      >
        <Stack
          spacing={3}
          direction="row"
          alignItems="center"
          bg={"var(--lvl1-darkcolor)"}
          border="1px solid " // Appliquer une bordure grise à la boîte
          borderColor={" var(--bordercolor)"}
          minW={"350px"}
          h={"80px"}
          rounded={20}
        >
          <Text fontSize="5xl" m={"auto"} fontWeight={"bold"}>
            {String(time.hours).padStart(2, "0")} :{" "}
            {String(time.minutes).padStart(2, "0")} :{" "}
            {String(time.seconds).padStart(2, "0")}
          </Text>
        </Stack>
        <Flex gap={10}>
          <Flex
          rounded={'50%'}
          bg={"#4ef08153"}
          border="1px solid " // Appliquer une bordure grise à la boîte
          borderColor={" var(--bordercolor)"}
          alignContent={'center'}
          alignItems={'center'}
          justifyContent={'center'}
          p={2}
          >
            <VscDebugStart size={25} />
          </Flex>
          <Flex
          rounded={'50%'}
          bg={"#4ebff04f"}
          border="1px solid " // Appliquer une bordure grise à la boîte
          borderColor={" var(--bordercolor)"}
          alignContent={'center'}
          alignItems={'center'}
          justifyContent={'center'}
          p={2}
          >
            <PiPauseBold size={25} />
          </Flex>
          <Flex
          rounded={'50%'}
          bg={"#f04e4e4f"}

          border="1px solid " // Appliquer une bordure grise à la boîte
          borderColor={" var(--bordercolor)"}
          alignContent={'center'}
          alignItems={'center'}
          justifyContent={'center'}
          p={2}
          >
            <PiStopBold size={25} />
          </Flex>

        </Flex>
      </Flex>
    </Box>
  );
};

export default MuscleExerciceComponent;
