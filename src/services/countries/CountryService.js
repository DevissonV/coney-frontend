import { privateAxios } from '../../utils/api/axios';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Fetches all countries from the API.
 * @returns {Promise<Object[]>} A list of countries.
 * @throws {Error} If the request fails.
 */
export const fetchCountries = async () => {
  const response = await privateAxios.get(
    `${API_URL}/Countries/getAllCountries`,
  );
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error fetching countries');
  }

  return data;
};

/**
 * Creates a new country.
 * @param {Object} countryData - The country data to create.
 * @returns {Promise<Object>} The created country.
 * @throws {Error} If the request fails.
 */
export const createCountry = async (countryData) => {
  const response = await privateAxios.post(
    `${API_URL}/Countries/createCountry`,
    countryData,
  );
  const { status, code, data } = response.data;

  if (!status || code !== 201) {
    throw new Error('Error creating country');
  }

  return data;
};

/**
 * Fetches a country by its ID.
 * @param {number} id - The country ID.
 * @returns {Promise<Object>} The country data.
 * @throws {Error} If the request fails.
 */
export const getCountryById = async (id) => {
  const response = await privateAxios.get(
    `${API_URL}/Countries/getCountry/${id}`,
  );
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error(`Error fetching country with ID ${id}`);
  }

  return data;
};

/**
 * Deletes a country by its ID.
 * @param {number} id - The country ID.
 * @returns {Promise<boolean>} True if deletion was successful.
 * @throws {Error} If the request fails.
 */
export const deleteCountry = async (id) => {
  const response = await privateAxios.delete(
    `${API_URL}/Countries/deleteCountry/${id}`,
  );
  const { status, code } = response.data;

  if (!status || code !== 200) {
    throw new Error(`Error deleting country with ID ${id}`);
  }

  return true;
};

/**
 * Updates a country by its ID.
 * @param {number} id - The country ID.
 * @param {Object} countryData - The updated country data.
 * @returns {Promise<Object>} The updated country.
 * @throws {Error} If the request fails.
 */
export const editCountry = async (id, countryData) => {
  const response = await privateAxios.put(
    `${API_URL}/Countries/updateCountry/${id}`,
    countryData,
  );
  const { status, code, data } = response.data;

  if (!status || code !== 200) {
    throw new Error('Error updating country');
  }

  return data;
};
