import { privateAxios } from '../../utils/api/axios';
import { getToken } from "../../utils/authHelpers"; 

const API_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => {
  const token = getToken();
  if (!token) throw new Error("Token no disponible. Por favor, inicia sesión.");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchRaffle = async () => {
  const response = await privateAxios.get(`${API_URL}/raffles/`,getHeaders());
  const { status, code, data } = response.data;
  if (!status || code !== 200) {
    throw new Error('Error fetching riffle');
  }

  return data;
};

export const fetchTicketsByRiffle = async (riffleId) => {
  const response = await privateAxios.get(`${API_URL}/tickets/?raffle_id=${riffleId}`,getHeaders());
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    // throw new Error('Error fetching tickets');
    console.log('Error fetching tickets');
  }

  return data;
};

export const createRiffle = async (riffleData) => {
  const response = await privateAxios.post(`${API_URL}/raffles/`, riffleData);
  const { status, code, data } = response.data;
  if (!status || code !== 201) {
    throw new Error('Error creating riffle');
  }

  return data;
};

export const getRiffleById = async (id) => {
  const response = await privateAxios.get(`${API_URL}/Riffles/getRiffle/${id}`);
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error(`Error fetching riffle with ID ${id}`);
  }

  return data;
};

export const deleteRiffle = async (id) => {
  const response = await privateAxios.delete(`${API_URL}/Riffles/deleteRiffle/${id}`);
  const { status, code } = response.data;

  if (!status || code !== 200) {
    throw new Error(`Error deleting riffle with ID ${id}`);
  }

  return true; 
};

export const editRiffle = async (id, riffleData) => {
  const response = await privateAxios.put(`${API_URL}/Riffles/updateRiffle/${id}`, riffleData);
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error updating riffle');
  }

  return data;
};
