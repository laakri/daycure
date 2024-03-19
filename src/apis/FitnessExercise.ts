import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://work-out-api1.p.rapidapi.com/search',
  params: {Muscles: 'biceps'},
  headers: {
    'X-RapidAPI-Key': 'f56a29727amsh1e440faac635274p1398a7jsn31b9a76e1c98',
    'X-RapidAPI-Host': 'work-out-api1.p.rapidapi.com'
  }
};
export const getFitnessExercice = async () =>{
    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}
