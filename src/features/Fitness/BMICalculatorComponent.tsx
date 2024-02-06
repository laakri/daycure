import React, { useState } from 'react'
import { Box, Heading, Input, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";

const BMICalculatorComponent: React.FC = () => {
    const [age, setAge] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
  
    const handleChangeAge = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAge(parseInt(e.target.value, 10));
    };
  
    const handleChangeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHeight(parseInt(e.target.value, 10));
    };
  
    const handleChangeWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
      setWeight(parseInt(e.target.value, 10));
    };
  
    const BMI =( weight / (height * height));
  return (
    
    <Box>
          <Heading as="h2" size="xl" color={"purple.500"} pb={'20px'}>
BMI Calculator
      </Heading>
      <Input
        type="number"
        placeholder="Age"
        onChange={handleChangeAge}
      />
      <Input
        type="number"
        placeholder="Height"
        onChange={handleChangeHeight}
      />
      <RadioGroup>
        <Stack direction="row">
          <Radio value="1">Female</Radio>
          <Radio value="2">Male</Radio>
        </Stack>
      </RadioGroup>
      <Input
        type="number"
        placeholder="Weight"
        onChange={handleChangeWeight}
        value={weight}
      />

      <Text>Resultat : {BMI.toFixed(2)}</Text>
    </Box>
  
  );
}

export default BMICalculatorComponent
