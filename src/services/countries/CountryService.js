import { privateAxios } from '../../utils/api/axios'; 

const API_URL = import.meta.env.VITE_API_URL;

export const fetchCountries = async () => {
  const response = await privateAxios.get(`${API_URL}/Countries/getAllCountries`); 
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error fetching countries');
  }

  return data;
};

export const createCountry = async (countryData) => {
  const response = await privateAxios.post(`${API_URL}/Countries/createCountry`, countryData);
  const { status, code, data } = response.data;

  if (!status || code !== 201) {
    throw new Error('Error creating country');
  }

  return data;
};

export const getCountryById = async (id) => {
  const response = await privateAxios.get(`${API_URL}/Countries/getCountry/${id}`);
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error(`Error fetching country with ID ${id}`);
  }

  return data;
};

export const deleteCountry = async (id) => {
  const response = await privateAxios.delete(`${API_URL}/Countries/deleteCountry/${id}`);
  const { status, code } = response.data;

  if (!status || code !== 200) {
    throw new Error(`Error deleting country with ID ${id}`);
  }

  return true; 
};

export const editCountry = async (id, countryData) => {
  const updatedCountryData = {
    id: id,          
    ...countryData   
  };

  const response = await privateAxios.put(`${API_URL}/Countries/updateCountry`, updatedCountryData);
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error updating country');
  }

  return data;
};
