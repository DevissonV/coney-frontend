import { privateAxios } from '../../utils/api/axios';
import { jwt_Decode } from '../../utils/generic/jwtDecode';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Authenticates a user by sending login credentials to the server.
 * If mock mode is enabled, it simulates a login instead.
 *
 * @async
 * @function login
 * @param {Object} credentials - The user's login credentials.
 * @param {string} credentials.email - The user's email.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<{user: Object, token: string}>} The authenticated user and access token.
 * @throws {Error} If the login fails due to invalid credentials or server issues.
 */
export const login = async (credentials) => {
  const isMock = import.meta.env.VITE_REACT_APP_USE_MOCK === 'true';
  if (isMock) {
    return simulateLogin(credentials);
  }

  try {
    const response = await privateAxios.post(
      `${API_URL}/users/login/`,
      credentials,
    );
    const { status, code, data } = response.data;
    if (!status || code !== 200) {
      throw new Error('Invalid credentials');
    }

    const { token } = data;
    const decodedToken = jwt_Decode(token);

    return {
      user: {
        id: decodedToken.id,
        email: decodedToken.email,
        first_name: decodedToken.firstName,
        last_name: decodedToken.lastName,
        role: decodedToken.role,
      },
      token,
    };
  } catch (error) {
    throw new Error(
      `Login failed: ${error.response?.data?.message || error.message}`,
    );
  }
};

/**
 * Simulates a user login for testing purposes.
 * Returns a mock user if the provided credentials match predefined values.
 *
 * @function simulateLogin
 * @param {Object} credentials - The user's login credentials.
 * @param {string} credentials.email - The user's email.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<{user: Object, token: string}>} A simulated user and access token.
 * @throws {Error} If the credentials are invalid.
 */
const simulateLogin = (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        credentials.email === 'dev@pruebas.com' &&
        credentials.password === 'pass123'
      ) {
        resolve({
          user: {
            id: 1,
            firstName: 'Devisson',
            lastName: 'Vasquez',
            email: 'dev@pruebas.com',
            role: 'user',
          },
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

/**
 * Logs out the user by removing authentication data from local storage.
 *
 * @function logout
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
