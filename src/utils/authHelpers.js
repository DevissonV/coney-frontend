/**
 * Retrieves the authentication token from local storage.
 *
 * @returns {string|null} The token if found, otherwise null.
 */
export const getToken = () => {
  try {
    return localStorage.getItem('token') || null;
  } catch (error) {
    return error;
  }
};
