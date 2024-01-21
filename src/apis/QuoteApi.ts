import axios from "axios";

const BASE_URL = "https://famous-quotes4.p.rapidapi.com";

const quotesApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-RapidAPI-Key": "ad601afa83msh59ba055e06eb96dp1f0854jsne6b88450f0ab",
    "X-RapidAPI-Host": "famous-quotes4.p.rapidapi.com",
  },
});

export const getRandomQuotes = async (count: number): Promise<any> => {
  try {
    const response = await quotesApi.get("/random", {
      params: {
        category: "all",
        count: count.toString(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
