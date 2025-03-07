/**
 * Retrieves the authentication token from local storage.
 *
 * @returns {string|null} The token if found, otherwise null.
 */
export const getToken = () => {
  try {
    return localStorage.getItem('token') || null;
  } catch (error) {
    console.error('Error retrieving token from storage:', error);
    return null;
  }
};
