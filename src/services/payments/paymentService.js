import { privateAxios } from '../../utils/api/axios';
import { getHeaders } from '../../utils/api/headers';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Updates a payment with the given payment ID and data.
 *
 * @async
 * @function
 * @param {string} id - The ID of the payment to update.
 * @param {Object} paymentData - The data to update the payment with.
 * @returns {Promise<Object>} The updated payment data.
 * @throws {Error} If the update operation fails or the response status is not successful.
 */
export const update = async (id, paymentData) => {
  const response = await privateAxios.patch(
    `${API_URL}/payments/${id}`,
    paymentData,
    getHeaders(),
  );
  const { status, code, data } = response.data;
  if (!status || code !== 200) {
    throw new Error('Error updating payment');
  }

  return data;
};

/**
 * Creates a Stripe session for ticket payment.
 * @param {Object} payload - The data to send for session creation.
 * @param {number} payload.amount - Total amount in COP.
 * @param {Array<number>} payload.tickets - IDs of the selected tickets.
 * @param {number} payload.id - Raffle ID.
 * @returns {Promise<string>} A promise resolving to the Stripe session URL.
 */
export const create = async (payload) => {
  const response = await privateAxios.post(
    `${API_URL}/payments/`,
    payload,
    getHeaders(),
  );
  const { status, code, data } = response.data;

  if (!status || code !== 201) {
    throw new Error('Error creating Stripe session');
  }

  return data.stripe_session_url;
};

/**
 * Fetches the list of payments from the API.
 *
 * @async
 * @function fetchPayments
 * @returns {Promise<Object>} A promise that resolves to the payment data.
 * @throws {Error} Throws an error if the API response status is false or the code is not 200.
 */
export const fetch = async () => {
  const response = await privateAxios.get(
    `${API_URL}/payments/?limit=100`,
    getHeaders(),
  );
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error fetching payments');
  }

  return data;
};

/**
 * Marks a payment as completed by sending a PATCH request to the server.
 *
 * @async
 * @function markCompleted
 * @param {string} id - The unique identifier of the payment to be marked as completed.
 * @returns {Object} The data returned from the server after successfully marking the payment as completed.
 * @throws {Error} If the server response indicates a failure (e.g., status is false or code is not 200).
 */
export const markCompleted = async (id) => {
  const response = await privateAxios.patch(
    `${API_URL}/payments/${id}/mark-completed`,
    {},
    getHeaders(),
  );
  const { status, code, data } = response.data;
  if (!status || code !== 200) {
    throw new Error('error completing payment');
  }

  return data;
};
