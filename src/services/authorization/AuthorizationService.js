import { privateAxios } from '../../utils/api/axios';
import { getHeaders } from '../../utils/api/headers';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Fetches authorization by raffle ID.
 * @param {number|string} raffleId - The ID of the raffle.
 * @returns {Promise<Object|null>} The authorization record or null if none exists.
 */
export const getAuthorizationByRaffle = async (raffleId) => {
  const response = await privateAxios.get(
    `${API_URL}/authorizations/?raffle_id=${raffleId}&limit=1&page=1`,
    getHeaders(),
  );

  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error fetching authorization');
  }

  return data.length > 0 ? data[0] : null;
};

/**
 * Creates a new authorization for a raffle.
 * @param {Object} payload - The data to send.
 * @returns {Promise<Object>} The created authorization.
 */
export const createAuthorization = async (payload) => {
  const response = await privateAxios.post(
    `${API_URL}/authorizations/`,
    payload,
    getHeaders(),
  );

  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error creating authorization');
  }

  return data;
};

/**
 * Uploads a document related to a raffle authorization.
 * @param {Object} formData - Must include file, type, raffleId.
 * @param {number|string} raffleId - ID of the raffle.
 * @returns {Promise<Object>} The uploaded document record.
 */
export const uploadAuthorizationDocument = async (formData, raffleId) => {
  const response = await privateAxios.post(
    `${API_URL}/authorizations/${raffleId}/documents`,
    formData,
    {
      headers: {
        ...getHeaders().headers,
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error uploading document');
  }

  return data;
};

/**
 * Deletes an authorization by its ID.
 * @param {number|string} id - Authorization ID.
 * @returns {Promise<boolean>}
 */
export const deleteAuthorization = async (id) => {
  const response = await privateAxios.delete(
    `${API_URL}/authorizations/${id}`,
    getHeaders(),
  );

  const { status, code } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error deleting authorization');
  }

  return true;
};
