import axios from "axios";

export const fetchData = async (): Promise<void> => {
    const options = {
        method: 'GET',
        url: 'https://daily-horoscope-api.p.rapidapi.com/api/Daily-Horoscope-English/',
        params: {
          zodiacSign: 'aries',
          timePeriod: 'weekly'
        },
        headers: {
          'X-RapidAPI-Key': 'f56a29727amsh1e440faac635274p1398a7jsn31b9a76e1c98',
          'X-RapidAPI-Host': 'daily-horoscope-api.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
          return response.data;
      } catch (error) {
          console.error(error);
      }
};
