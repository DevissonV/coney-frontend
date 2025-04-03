import { getToken } from '../../utils/authHelpers';
/**
 * Retrieves authentication headers with the Bearer token.
 * @throws {Error} If the token is not available.
 * @returns {Object} Headers object with Authorization token.
 */
export const getHeaders = () => {
  const token = getToken();
  if (!token) throw new Error('Token no disponible. Por favor, inicia sesión.');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
