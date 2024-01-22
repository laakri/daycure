import axios, { AxiosResponse } from 'axios';

interface Store {
  address: {
    address1: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  displayName: string;
  // Add other properties as needed
}

export const getSephoraProdData = async (): Promise<AxiosResponse<{ stores: Store[] }>> => {
  const options = {
    method: 'GET',
    url: 'https://sephora.p.rapidapi.com/stores/list',
    params: {
      latitude: '33.9733',
      longitude: '-118.2487',
      radius: '25'
    },
    headers: {
      'X-RapidAPI-Key': 'f56a29727amsh1e440faac635274p1398a7jsn31b9a76e1c98',
      'X-RapidAPI-Host': 'sephora.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request<{ stores: Store[] }>(options);
    console.log(response.data);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
