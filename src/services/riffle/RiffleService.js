import { privateAxios } from '../../utils/api/axios';
import { getHeaders } from '../../utils/api/headers';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Fetches a list of raffles from the API.
 *
 * @async
 * @function fetchRaffle
 * @returns {Promise<Object>} A promise that resolves to the data containing the raffles.
 * @throws {Error} Throws an error if the API response status is false or the code is not 200.
 */
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

/**
 * Fetches tickets associated with a specific raffle ID.
 *
 * @async
 * @function fetchTicketsByRiffle
 * @param {string} riffleId - The ID of the raffle to fetch tickets for.
 * @returns {Promise<Object>} A promise that resolves to the data containing the tickets.
 * @throws {Error} Throws an error if the response status is false or the response code is not 200.
 */
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

/**
 * Creates a new raffle by sending a POST request to the API.
 *
 * @async
 * @function createRaffles
 * @param {Object} raffleData - The data for the raffle to be created.
 * @returns {Object} The data of the created raffle.
 * @throws {Error} If the response status is not successful or the code is not 201.
 */
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

/**
 * Deletes a riffle by its ID.
 *
 * @async
 * @function deleteRiffle
 * @param {number|string} id - The ID of the riffle to delete.
 * @returns {Promise<boolean>} Returns `true` if the riffle was successfully deleted.
 * @throws {Error} Throws an error if the deletion fails or the response status is invalid.
 */
export const deleteRiffle = async (id) => {
  const response = await privateAxios.delete(
    `${API_URL}/raffles/${id}`,
    getHeaders(),
  );
  const { status, code } = response.data;

  if (!status || code !== 200) {
    throw new Error(`Error deleting riffle with ID ${id}`);
  }

  return true;
};

/**
 * Updates an existing raffle (riffle) with the provided data.
 *
 * @async
 * @function editRiffle
 * @param {string} id - The unique identifier of the raffle to update.
 * @param {Object} raffleData - The data to update the raffle with.
 * @param {number} raffleData.ticketCount - The number of tickets (excluded from the update payload).
 * @param {Object} raffleData.sanitizedData - The remaining sanitized data for the update.
 * @returns {Promise<Object>} The updated raffle data.
 * @throws {Error} If the update fails or the response status code is not 200.
 */
export const editRiffle = async (id, raffleData) => {
  const { ticketCount, ...sanitizedData } = raffleData;
  const response = await privateAxios.patch(
    `${API_URL}/raffles/${id}`,
    sanitizedData,
    getHeaders(),
  );
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error updating riffle');
  }

  return data;
};

/**
 * Selects a winner for a given raffle.
 *
 * Sends a POST request to the API to select a winner for the specified raffle ID.
 * Throws an error if the response status is false or the response code is not 201.
 *
 * @async
 * @function
 * @param {string} raffleId - The ID of the raffle for which a winner is to be selected.
 * @returns {Object} The data returned from the API containing the winner information.
 * @throws {Error} If the API response indicates a failure or an unexpected status code.
 */
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
