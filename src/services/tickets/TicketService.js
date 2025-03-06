import { privateAxios } from '../../utils/api/axios';
import { getToken } from '../../utils/authHelpers';

const API_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => {
  const token = getToken();
  if (!token) throw new Error('Token no disponible. Por favor, inicia sesión.');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchTickets = async () => {
  const response = await privateAxios.get(`${API_URL}/Tickets/getAllRiffles`);
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error fetching tickets');
  }

  return data;
};

export const createTicket = async (ticketData) => {
  const response = await privateAxios.post(
    `${API_URL}/Tickets/createTicket`,
    ticketData
  );
  const { status, code, data } = response.data;

  if (!status || code !== 201) {
    throw new Error('Error creating ticket');
  }

  return data;
};

export const getTicketById = async (id) => {
  const response = await privateAxios.get(`${API_URL}/Tickets/getTicket/${id}`);
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error(`Error fetching ticket with ID ${id}`);
  }

  return data;
};

export const deleteTicket = async (id) => {
  const response = await privateAxios.delete(
    `${API_URL}/Tickets/deleteTicket/${id}`
  );
  const { status, code } = response.data;

  if (!status || code !== 200) {
    throw new Error(`Error deleting ticket with ID ${id}`);
  }

  return true;
};

export const editTicket = async (id, ticketData) => {
  const response = await privateAxios.put(
    `${API_URL}/Tickets/updateTicket/${id}`,
    ticketData
  );
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error updating ticket');
  }

  return data;
};

export const fetchTicketsByRiffle = async (riffleId, limit = 100) => {
  const response = await privateAxios.get(
    `${API_URL}/tickets/?limit=${limit}&raffle_id=${riffleId}`
  );
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    // throw new Error('Error fetching tickets');
    console.log('Error fetching tickets');
  }

  return data;
};
