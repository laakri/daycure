// financeApi.ts
import axios from "axios";

const API_KEY = "ad601afa83msh59ba055e06eb96dp1f0854jsne6b88450f0ab";
const API_URL = "https://ms-finance.p.rapidapi.com/market/get-articles";

export const getFinanceArticles = async () => {
  try {
    const options = {
      method: "GET",
      url: API_URL,
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "ms-finance.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching finance articles:", error);
    throw error;
  }
};
