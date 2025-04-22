import { privateAxios } from '../../utils/api/axios';
import { getHeaders } from '../../utils/api/headers';

const API_URL = import.meta.env.VITE_API_URL;
/**
 * Fetches all raffle tickets from the API.
 * @throws {Error} If the request fails or the response status is not 200.
 * @returns {Promise<Array>} A promise resolving to an array of ticket data.
 */
export const fetchTickets = async () => {
  const response = await privateAxios.get(`${API_URL}/tickets/`, getHeaders());
  const { status, code, data } = response.data;
  if (!status || code !== 200) {
    throw new Error('Error fetching tickets');
  }

  return data;
};

/**
 * Deletes a ticket by its ID.
 * @param {number|string} id - The ID of the ticket to delete.
 * @throws {Error} If the request fails or the response status is not 200.
 * @returns {Promise<boolean>} A promise resolving to true if the ticket was deleted successfully.
 */
export const deleteTicket = async (id) => {
  const response = await privateAxios.delete(
    `${API_URL}/Tickets/deleteTicket/${id}`,
  );
  const { status, code } = response.data;

  if (!status || code !== 200) {
    throw new Error(`Error deleting ticket with ID ${id}`);
  }

  return true;
};

/**
 * Updates a ticket by its ID.
 * @param {number|string} id - The ID of the ticket to update.
 * @param {Object} ticketData - The updated ticket data.
 * @throws {Error} If the request fails or the response status is not 200.
 * @returns {Promise<Object>} A promise resolving to the updated ticket data.
 */
export const editTicket = async ({ ticketId, userId }) => {
  const response = await privateAxios.patch(
    `${API_URL}/tickets/${ticketId}`,
    { userId },
    getHeaders(),
  );
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    const error = new Error(data?.message || 'Error updating ticket');
    error.response = { data: { message: data?.message } };
    throw error;
  }

  return data;
};

/**
 * Fetches tickets by raffle ID with an optional limit.
 * @param {number|string} riffleId - The ID of the raffle to filter tickets by.
 * @param {number} [limit=100] - The maximum number of tickets to retrieve.
 * @returns {Promise<Array>} A promise resolving to an array of ticket data.
 */
export const fetchTicketsByRiffle = async (riffleId) => {
  const response = await privateAxios.get(
    `${API_URL}/tickets/availables/?raffle_id=${riffleId}&limit=100`,
  );
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error fetching tickets');
  }

  return data;
};

export const raffleById = async (id) => {
  const response = await privateAxios.get(
    `${API_URL}/raffles/${id}`,
    getHeaders(),
  );
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error(`Error fetching raffles with ID ${id}`);
  }

  return data;
};

export const ticketById = async (id) => {
  const response = await privateAxios.get(
    `${API_URL}/tickets/${id}`,
    getHeaders(),
  );
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error(`Error fetching ticket with ID ${id}`);
  }

  return data;
};
