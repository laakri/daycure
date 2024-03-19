import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Box } from '@chakra-ui/react';

const FitnessExercise: React.FC = () => {
  const [exerciseData, setExerciseData] = useState<any>(null);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://work-out-api1.p.rapidapi.com/search',
      params: { Muscles: 'biceps' },
      headers: {
        'X-RapidAPI-Key': 'f56a29727amsh1e440faac635274p1398a7jsn31b9a76e1c98',
        'X-RapidAPI-Host': 'work-out-api1.p.rapidapi.com'
      }
    };

    const fetchExerciseData = async () => {
      try {
       

        const response = await axios.request(options);
        setExerciseData(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchExerciseData();
  }, []);

  console.log(exerciseData); 

  return (
    <div>
      {exerciseData && (
        <Box>
          {exerciseData.map((exercise: any, index: number) => (
            <div key={index}>
              <h2>{exercise.Muscles}</h2>
              {/* Include other exercise details here */}
            </div>
          ))}
        </Box>
      )}
    </div>
  );
}

export default FitnessExercise;
