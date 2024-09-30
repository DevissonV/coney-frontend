import { privateAxios } from '../../utils/api/axios'; 

const API_URL = import.meta.env.VITE_API_URL;

export const fetchTickets = async () => {
  const response = await privateAxios.get(`${API_URL}/Tickets/getAllTickets`); 
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error fetching tickets');
  }

  return data;
};

export const createTicket = async (ticketData) => {
  const response = await privateAxios.post(`${API_URL}/Tickets/createTicket`, ticketData);
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
  const response = await privateAxios.delete(`${API_URL}/Tickets/deleteTicket/${id}`);
  const { status, code } = response.data;

  if (!status || code !== 200) {
    throw new Error(`Error deleting ticket with ID ${id}`);
  }

  return true; 
};

export const editTicket = async (id, ticketData) => {
  const response = await privateAxios.put(`${API_URL}/Tickets/updateTicket/${id}`, ticketData);
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error updating ticket');
  }

  return data;
};
