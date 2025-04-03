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
 * Creates a new ticket.
 * @param {Object} ticketData - The data of the ticket to be created.
 * @throws {Error} If the request fails or the response status is not 201.
 * @returns {Promise<Object>} A promise resolving to the created ticket data.
 */
export const createTicket = async (ticketData) => {
  const response = await privateAxios.post(
    `${API_URL}/Tickets/createTicket`,
    ticketData,
    getHeaders(),
  );
  const { status, code, data } = response.data;

  if (!status || code !== 201) {
    throw new Error('Error creating ticket');
  }

  return data;
};

/**
 * Retrieves a ticket by its ID.
 * @param {number|string} id - The ID of the ticket to fetch.
 * @throws {Error} If the request fails or the response status is not 200.
 * @returns {Promise<Object>} A promise resolving to the ticket data.
 */
export const getTicketById = async (id) => {
  const response = await privateAxios.get(`${API_URL}/Tickets/getTicket/${id}`);
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error(`Error fetching ticket with ID ${id}`);
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
export const editTicket = async (id) => {
  const idticket = id['ticketId'];
  const userId = id['userid'];

  const response = await privateAxios.patch(
    `${API_URL}/tickets/${idticket}`,
    { userId },
    getHeaders(),
  );
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error updating ticket');
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
    `${API_URL}/tickets/availables/?raffle_id=${riffleId}`,
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
    throw new Error(`Error fetching ticket with ID ${id}`);
  }

  return data;
};

/**
 * Fetches available tickets for a given raffle.
 *
 * @param {number} raffleId - The ID of the raffle to fetch available tickets for.
 * @returns {Promise<Object>} A promise that resolves to the data containing available tickets.
 * @throws {Error} If the request fails or the response status code is not 200.
 */
export const ticketsAvaliables = async (raffle_id) => {
  const response = await privateAxios.get(
    `${API_URL}/tickets/availables/&raffle_id=${raffle_id}`,
  );
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error(`Error fetching ticket with ID ${raffle_id}`);
  }

  return data;
};
