import { publicAxios } from '../../utils/api/axios'; 

const API_URL = '/static/countries.json';

export const fetchCountries = async () => {
  const response = await publicAxios.get(API_URL); 
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error fetching countries');
  }

  return data;
};

export const createCountry = async (countryData) => {
  const response = await publicAxios.post(`${API_URL}/Country/createCountry`, countryData);
  const { status, code, data } = response.data;

  if (!status || code !== 201) {
    throw new Error('Error creating country');
  }

  return data;
};

export const getCountryById = async (id) => {
  const response = await publicAxios.get(`${API_URL}/Country/getCountryById/${id}`);
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error(`Error fetching country with ID ${id}`);
  }

  return data;
};

export const deleteCountry = async (id) => {
  const response = await publicAxios.delete(`${API_URL}/Country/deleteCountry/${id}`);
  const { status, code } = response.data;

  if (!status || code !== 200) {
    throw new Error(`Error deleting country with ID ${id}`);
  }

  return true; 
};

export const editCountry = async (id, countryData) => {
  const response = await publicAxios.put(`${API_URL}/Country/updateCountry/${id}`, countryData);
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error updating country');
  }

  return data;
};
