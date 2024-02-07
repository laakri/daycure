import React from "react";
import { Text, Flex, Input, Button, Box, InputGroup, InputRightElement } from "@chakra-ui/react";
import ReactApexChart from 'react-apexcharts';

const BMIComponent: React.FC = () => {
  const calculateColor = (bmi: number) => {
    if (bmi >= 16 && bmi < 18) {
      return '#e0bce4e6'; // Rouge
    } else if (bmi >= 18 && bmi < 25) {
      return '#9c69b9a2'; // Vert
    } else if (bmi >= 25 && bmi < 30) {
      return '#a23dafe6'; // Jaune
    } else if (bmi >= 30 && bmi <= 40) {
      return '#3c0c57e6'; // Rouge
    } else {
      return '#000000'; // Noir par défaut ou autre couleur
    }
  };
  const labels = ['16-18', '18-25', '25-30', '30-40'];
  const labelColors = labels.map(label => calculateColor(calculateMidpoint(label)));

  function calculateMidpoint(label: string): number {
    const range = label.split('-').map(Number);
    return (range[0] + range[1]) / 2;
  }

  const [state] = React.useState({
    series: [1, 1, 1, 1], // Une série pour chaque plage de valeurs de BMI
    options: {
      chart: {
        width: 380,
        type: 'donut',
      },
      labels:labels,// Étiquettes pour chaque plage de valeurs de BMI
      dataLabels: {
        enabled: false
      },
      fill: {
        colors: [calculateColor(17), calculateColor(21), calculateColor(27), calculateColor(35)], // Couleurs en fonction des plages de valeurs de BMI
      },
     
      title: {
        text: ''
      },
      colors: labelColors,
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  });

  return (
    <Flex flexDirection={"row"} gap={5}>
      <Box display={'flex'} flexDirection={'column'} gap={2}>
        <Text fontSize={"xl"} color={"purple.100"}>
          Calcul BMI
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

        <Input
          placeholder="Weight"
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
          Confirm
        </Button>
      </Box>
      <Box>
      <Text fontSize={"xl"} color={"purple.100"}>
           BMI Range
        </Text>
        <ReactApexChart options={state.options} series={state.series} type="donut" />
        <Text fontSize={"l"} color={"gray.400"} textAlign={'center'} mt={'20px'}>
           BMI Range : Obese Class II
        </Text>
      </Box>
      <Box>
      <Text fontSize={"xl"} color={"purple.100"}>
          Resultat
        </Text>
      <InputGroup>
        <Input
          placeholder="Resultat BMI "
          bg={"var(--lvl1-darkcolor)"}
          textAlign={"center"}
          h={"100px"}
          fontSize={"50px"}
          border={"1px solid transparent"}
          mb={"10px"}
          mt={'8px'}
         disabled
        />
        <InputRightElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
        >
          kg/m2
        </InputRightElement>
      </InputGroup>
      <Flex justifyContent={"space-between"} px={'1px'}>
      <Flex gap={4} p={"5px 10px"} bg={"var(--lvl1-darkcolor)"} rounded={4}>
          <Box
            bg={"var(--lvl4-darkcolor)"}
            p={" 0 10px"}
            rounded={4}
            _hover={{
              cursor: "pointer",
            }}
          >
            Advices
          </Box>
          <Box
            bg={"var(--lvl1-darkcolor)"}
            p={" 0 10px"}
            rounded={4}
            _hover={{
              cursor: "pointer",
            }}
          >
            Exercices
          </Box>
        </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default BMIComponent;
