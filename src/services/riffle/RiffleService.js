import { privateAxios } from '../../utils/api/axios';
import { getHeaders } from '../../utils/api/headers';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchRaffle = async () => {
  const response = await privateAxios.get(
    `${API_URL}/raffles/?limit=1000&page=1`,
  );
  const { status, code, data } = response.data;
  if (!status || code !== 200) {
    throw new Error('Error fetching riffle');
  }

  return data;
};

export const fetchTicketsByRiffle = async (riffleId) => {
  const response = await privateAxios.get(
    `${API_URL}/tickets/?raffle_id=${riffleId}`,
  );
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error fetching tickets');
  }

  return data;
};

export const createRaffles = async (raffleData) => {
  const response = await privateAxios.post(
    `${API_URL}/raffles/`,
    raffleData,
    getHeaders(),
  );
  const { status, code, data } = response.data;
  if (!status || code !== 201) {
    throw new Error('Error creating riffle');
  }

  return data;
};

export const deleteRiffle = async (id) => {
  const response = await privateAxios.delete(
    `${API_URL}/Riffles/deleteRiffle/${id}`,
  );
  const { status, code } = response.data;

  if (!status || code !== 200) {
    throw new Error(`Error deleting riffle with ID ${id}`);
  }

  return true;
};

export const editRiffle = async (id, riffleData) => {
  const response = await privateAxios.put(
    `${API_URL}/Riffles/updateRiffle/${id}`,
    riffleData,
  );
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error updating riffle');
  }

  return data;
};

export const selectWinner = async (raffleId) => {
  const response = await privateAxios.post(
    `${API_URL}/winners/`,
    { raffle_id: raffleId },
    getHeaders(),
  );
  const { status, code, data } = response.data;
  if (!status || code !== 201) {
    throw new Error('Error selected winner');
  }

  return data;
};
