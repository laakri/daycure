import axios from "axios";

const API_KEY = "ad601afa83msh59ba055e06eb96dp1f0854jsne6b88450f0ab";
const API_URL = "https://coinranking1.p.rapidapi.com/coins";

export const getCryptoData = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        referenceCurrencyUuid: "yhjMzLPhuIDl",
        timePeriod: "24h",
        "tiers[0]": "1",
        orderBy: "marketCap",
        orderDirection: "desc",
        limit: "5",
        offset: "0",
      },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    throw error;
  }
};
