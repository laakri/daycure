import axios from "axios";

const API_KEY = "30ac8ac7fcmshae821a48f077ac0p1fbb2cjsn645dfb7592a3";
const API_URL = "https://open-weather13.p.rapidapi.com/city/Tunisie";

export const getWeatherData = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
