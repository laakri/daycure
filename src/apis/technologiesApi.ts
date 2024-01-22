import axios from "axios";

const API_KEY = "ad601afa83msh59ba055e06eb96dp1f0854jsne6b88450f0ab";
const API_URL = "https://duckduckgo10.p.rapidapi.com/search/news"; // Assuming you want to search news for technology

export const getTechnologyNews = async () => {
  try {
    const options = {
      method: "GET",
      url: API_URL,
      params: {
        term: "technology",
        region: "wt-wt",
        safeSearch: "off",
      },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "duckduckgo10.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching technology news:", error);
    throw error;
  }
};
