import axios from "axios";

const API_KEY = "ad601afa83msh59ba055e06eb96dp1f0854jsne6b88450f0ab";
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
