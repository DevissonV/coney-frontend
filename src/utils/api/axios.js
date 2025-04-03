import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Axios instance for making public HTTP requests.
 * This instance does not include additional configurations like base URL or headers.
 */
export const publicAxios = axios.create();

/**
 * Axios instance for making authenticated HTTP requests.
 *
 * Configurations:
 * - Base URL sourced from `VITE_API_URL`.
 * - Custom headers for content type and request identification.
 * - Credentials enabled for cross-origin requests.
 *
 * This instance is typically used for requests requiring authentication.
 */
export const privateAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});
